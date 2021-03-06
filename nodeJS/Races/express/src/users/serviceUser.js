var mongoose = require('../model');
class ServiceUser {
    constructor() {
        var usersSchema = new mongoose.Schema({
            name: String,
            surname: String,
            username: String
        });
        this.user = mongoose.model('User', usersSchema);
    }

   async getUserWithRace(id) {
       let result = await this.user.aggregate([
               {
                   $project: {
                       _id: {
                           $toString: "$_id"
                       },
                       name: "$name",
                       surname: "$surname",
                       username: "$username"
                   }
               },
                {
                    $lookup:
                        {
                            from: 'races',
                            localField: '_id',
                            foreignField: 'user_id',
                            as: 'racesForThisUser'

                        }
                },
               { $match : { _id : id } },
            ],
            async function (err, response) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(response)
                }
            }
        )
       return Promise.resolve(result)

    }



    async getUserForLeague(_id) {
        let result = await this.user.aggregate([
                {
                    $project: {
                        _id: {
                            $toString: "$_id"
                        },
                        name: "$name",
                        surname: "$surname",
                        username: "$username"
                    }
                },
                {
                    $lookup:
                        {
                            from: 'leagues',
                            localField: '_id',
                            foreignField: 'users_id',
                            as: 'leaguesForThisUser'

                        }
                },
                { $match : {_id } },
            ],
            async function (err, response) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(response)
                }
            }
        )
        return Promise.resolve(result)

    }





    async getTable(_id) {
        try {
            return await this.user.findOne({_id});
        } catch (e) {
            return e.message
        }
    }

    createTable(name, surname, username) {
        let user = new this.user({ name, surname, username});
        user.save();
        return user;
    }

    async updateTable(_id, name, surname, username) {
        try {
            return await this.user.findOneAndUpdate({_id}, {$set: {name, surname, username}}, {new: true})
        } catch (e) {
            return e.message
        }
    }

    async registerUserToLeague(req, res, league) {
        let userId = req.user.user._id;
        try {
            await this.user.find({_id: userId});
        } catch (e) {
           return e.message
        }
        let leagueId = req.body.leagueId;
        let checkedLeague;
        try {
            checkedLeague = await league.find({_id: leagueId});
        } catch (e) {
            return e.message
        }
        let arrayOfUsers = checkedLeague[0].users_id;
        if(arrayOfUsers.indexOf(userId) === -1) {
            arrayOfUsers.push(userId);
            let r = await league.findOneAndUpdate({_id: leagueId}, {$set: {users_id: arrayOfUsers}}, {new: true});
            console.log(r)
            return r
        } else {
            return "This user already exist"
        }
    }

    async deleteUser(id, race, league) {
        let tempLeague = await league.find({users_id: id});
        if(tempLeague !== null) {
            for(let i = 0; i < tempLeague.length; i++) {
                tempLeague[i]['users_id'].splice(tempLeague[i]['users_id'].indexOf(id), 1)
                await league.findOneAndUpdate({_id: tempLeague[i]['_id']}, tempLeague[i] )
            }
        }
        await race.findOneAndDelete({user_id: id});
        try {
            return await this.user.findOneAndDelete({_id: id});
        } catch (e) {
            return e.message
        }
    }
}

module.exports = ServiceUser;
