const joi = require('joi');
const User = require('./user.service');
const jwt = require('jsonwebtoken');

class userController {
    constructor() {
        this.user = new User();
        this.schemaUser = joi.object().keys({
            name: joi.string().required(),
            surname: joi.string().required(),
            username: joi.string().required(),
            password: joi.string().required(),
            friends: joi.array(),
            friendRequests: joi.array(),
            sentFriendRequests: joi.array()

        });
        this.refreshTokens = [];
        this.time = '35s';
    }

    async getUsers(req, res) {
        let users;
        users = await this.user.getTables();
        res.send(users)
    }

    async getUser(req, res) {
        let user;
        user = await this.user.getTable(req.params.id);
        res.send(user)
    }

    async createUser(req, res) {
        let result = joi.validate(req.body, this.schemaUser, (err, result) => {
            if (err) {
                return err.message
            } else {
                return this.user.createTable(req.body.name, req.body.surname, req.body.username, req.body.password, req.body.friends, req.body.friendRequests, req.body.sentFriendRequests);
            }
        })
        res.send(result);
    }

    async updateUser(req, res) {
        let rezult = await joi.validate(req.body, this.schemaUser, (err, result) => {
            if (err) {
                return 'error! Invalid date'
            } else {
                return this.user.updateTable(req.params.id, req.body.name, req.body.surname, req.body.username, req.body.password, req.body.friends);
            }
        })

        res.send(rezult);
    }

    async deleteUser(req, res) {
        let result = await this.user.deleteUser(req.params.id);
        if (result !== null) {
            res.sendStatus(200)
        } else {
            res.send('This user does not exist')
        }
    }


    async registerUser(req, res) {
        await joi.validate(req.body, this.schemaUser, async (err, result) => {
            if (err) {
                res.statusMessage = err.message;
                res.status(400).end();
            } else {
                let user = await this.user.getUserByUsername(req.body.username);
                if (user !== null) {
                    res.statusMessage = "This username already exists";
                    res.status(400).end();
                } else {
                    let user = req.body;
                    user['friends'] = [];
                    user['friendRequests'] = [];
                    user['sentFriendRequests'] = [];
                    let newUser =  await this.user.createTable(user);
                    let authUser = {_id: newUser._id, username: req.body.username, password: req.body.password};
                    const accessToken = this.generateAccessToken(authUser);
                    const refreshToken = this.generateRefreshToken(authUser);
                    this.refreshTokens.push(refreshToken);
                    res.json({
                        user: newUser,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        time: this.time
                    })
                }
            }
        })
    }

    async loginUser(req, res) {
        let user = await this.user.getUserByUsername(req.body.username);
        if (user === null) {
            res.statusMessage = "Wrong username";
            res.status(400).end();
        } else if (user.password !== req.body.password) {
            res.statusMessage = "Wrong password";
            res.status(400).end();
        } else {
            let authUser = {_id: user._id, username: user.username, password: user.password};
            const accessToken = this.generateAccessToken(authUser);
            const refreshToken = this.generateRefreshToken(authUser);
            this.refreshTokens.push(refreshToken);
            res.json({
                user: user,
                accessToken: accessToken,
                refreshToken: refreshToken,
                time: this.time
            })
        }
    }

    generateAccessToken(user) {
        return jwt.sign(user, 'access_token', {expiresIn: this.time});
    }

    generateRefreshToken(user) {
        return jwt.sign(user, 'refresh_token');
    }

    getNewAccessToken(req, res) {
        const refreshToken = req.body.token;
        if (refreshToken == null) res.sendStatus(401);
        if (!this.refreshTokens.includes(refreshToken)) res.sendStatus(403);
        jwt.verify(refreshToken, 'refresh_token', (err, user) => {
            delete user['iat'];
            if (err) res.sendStatus(403);
            const accessToken = this.generateAccessToken(user);
            res.json({
                accessToken: accessToken,
                time: this.time
            })
        })
    }

    getPermission(req, res) {
        jwt.verify(req.token, 'access_token', async (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                let user;
                user = await this.user.getUserByUsername(authData.username);
                res.json({
                    message: 'permission received',
                    user: user
                });
            }
        });
    }

    async friendRequest(req, res) {
        jwt.verify(req.token, 'access_token', async (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                let rez = await this.user.addFriendRequest(authData._id, req.params.id);
                if(rez === 400) {
                    res.statusMessage = "You have already sent a request to this user";
                    res.status(400).end();
                }
            }
        });
    }

    async cancelFriendRequest(req, res) {
        jwt.verify(req.token, 'access_token', async (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                let rez = await this.user.cancelFriendRequest(authData._id, req.params.id);
                if(rez === 400) {
                    res.statusMessage = "You have no sent a request to this user";
                    res.status(400).end();
                } else {
                    res.sendStatus(200)
                }
            }
        });
    }

    async acceptFriendRequest(req, res) {
        jwt.verify(req.token, 'access_token', async (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                let rez = await this.user.acceptFriendRequest(authData._id, req.params.id);
                if(rez === 400) {
                    res.statusMessage = "You have no sent a request to this user";
                    res.status(400).end();
                } else {
                    res.send(rez)
                }
            }
        });
    }

    async deleteFriendRequest(req, res) {
        jwt.verify(req.token, 'access_token', async (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                let rez = await this.user.deleteFriendRequest(authData._id, req.params.id);
                if(rez === 400) {
                    res.statusMessage = "You have no sent a request to this user";
                    res.status(400).end();
                } else {
                    res.send(rez)
                }
            }
        });
    }

    async getUserPublicInfo(req, res) {
        let accessProperties = ['name', 'surname', 'username', 'friends']
        let user = await this.user.getUserPublicInfoRequest(req.params.id);
        for( var key in user) {
            if(accessProperties.includes(key)) {
                delete user[key]
            }
        }
        delete user['name']
    }

}

module.exports = userController;
