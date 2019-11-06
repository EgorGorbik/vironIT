var mongoose = require('../config/model');
class ServiceUser {
    constructor() {
        this.user = mongoose.model('User');
    }

    async getTable(_id) {
        try {
            return await this.user.findOne({_id});
        } catch (e) {
            return e.message
        }
    }



    async getTables() {
        try {
            return await this.user.find();
        } catch (e) {
            return e.message
        }
    }

    createTable(userArg) {
        let user = new this.user(userArg);
        console.log(user)
        user.save();
        return user;
    }

    async updateTable(_id, name, surname, username, password, friends) {
        console.log('id ', _id)
        try {
            return await this.user.findOneAndUpdate({_id}, {$set: {name, surname, username, password, friends}}, {new: true})
        } catch (e) {
            return e.message
        }
    }

    async deleteUser(id) {
        try {
            return await this.user.findOneAndDelete({_id: id});
        } catch (e) {
            return e.message
        }
    }

    async getUserByUsername(username) {
        try {
            return await this.user.findOne({username: username});
        } catch (e) {
            return e.message
        }
    }

    async addFriendRequest(authId, requestId) {
        console.log('requestId ', requestId)
        let requestedUser = await this.user.findOne({_id: requestId});
        let authUser = await this.user.findOne({_id: authId});
        if(!authUser.sentFriendRequests.includes(requestId)) {
            requestedUser.friendRequests.push(authId);
            authUser.sentFriendRequests.push(requestId);
            console.log('requestedUser ', requestedUser);
            try {
                await this.user.findOneAndUpdate({_id: requestId}, {$set: requestedUser}, {new: true});
                await this.user.findOneAndUpdate({_id: authId}, {$set: authUser}, {new: true});
            } catch (e) {
                return e.message
            }
        } else {
            return 400
        }
    }

    async cancelFriendRequest(authId, requestId) {
        console.log('requestId ', requestId)
        let requestedUser = await this.user.findOne({_id: requestId});
        let authUser = await this.user.findOne({_id: authId});
        if(authUser.sentFriendRequests.includes(requestId)) {
            console.log('arr ', requestedUser.friendRequests);
            console.log('el ', authId)
            requestedUser.friendRequests = requestedUser.friendRequests.filter((el) => {el !== authId})
            authUser.sentFriendRequests = authUser.sentFriendRequests.filter((el) => {el !== requestId});
            console.log('requestedUser ', requestedUser);
            try {
                await this.user.findOneAndUpdate({_id: requestId}, {$set: requestedUser}, {new: true});
                await this.user.findOneAndUpdate({_id: authId}, {$set: authUser}, {new: true});
            } catch (e) {
                return e.message
            }
        } else {
            return 400
        }
    }

    async acceptFriendRequest(authId, acceptedId) {
        let acceptedUser = await this.user.findOne({_id: acceptedId});
        let authUser = await this.user.findOne({_id: authId});

            acceptedUser.sentFriendRequests = acceptedUser.sentFriendRequests.filter((el) => {el != authId});
            authUser.friendRequests = authUser.friendRequests.filter((el) => { return el !== acceptedId});
            console.log('authUser ', authUser)
            acceptedUser.friends.push(authId);
            authUser.friends.push(acceptedId);
            try {
                await this.user.findOneAndUpdate({_id: acceptedId}, {$set: acceptedUser}, {new: true});
                return await this.user.findOneAndUpdate({_id: authId}, {$set: authUser}, {new: true});
            } catch (e) {
                return e.message
            }
    }

    async deleteFriendRequest(authId, removableId) {
        let removableUser = await this.user.findOne({_id: removableId});
        let authUser = await this.user.findOne({_id: authId});

        removableUser.friends = removableUser.friends.filter((el) => {return el !== authId});
        authUser.friends = authUser.friends.filter((el) => {return el !== removableId});
        console.log(authUser)
        try {
            await this.user.findOneAndUpdate({_id: removableId}, {$set: removableUser}, {new: true});
            return await this.user.findOneAndUpdate({_id: authId}, {$set: authUser}, {new: true});
        } catch (e) {
            return e.message
        }
    }


    async getUserPublicInfoRequest(_id) {
        try {
            return await this.user.findOne({_id});
        } catch (e) {
            return e.message
        }

    }
}

module.exports = ServiceUser;
