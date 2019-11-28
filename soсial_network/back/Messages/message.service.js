var mongoose = require('../config/model');
class ServiceMessage {
    constructor() {
        this.user = mongoose.model('Message');
        this.realUser = mongoose.model('User');
    }

    async getMessage(arr) {
        try {
            let k = await this.user.findOne({members: { $all: arr }});
            return k;
        } catch (e) {
            return e.message
        }
    }

    async getChatsId(id) {
        try {
            console.log('id ', id)
            id = String(id)
            console.log(typeof id)
            let k = await this.user.find({members: id});
            console.log('user chats')
            console.log(k)
            return k;
        } catch (e) {
            return e.message
        }
    }

    async getChatId(arr) {
        try {
            console.log('arr ', arr)
            let k = await this.user.findOne({members: { $all: arr }});
            console.log('k ', k)
            return k;
        } catch (e) {
            return e.message
        }
    }

    createTable(userArg) {
        let user = new this.user(userArg);
        user.save();
        return user;
    }

    async updateTable(arr, arg) {
        try {
            return await this.user.findOneAndUpdate({members: { $all: arr }}, {$push: {messages: arg}}, {new: true})
        } catch (e) {
            return e.message
        }
    }

    async getMessages(_id, arg) {
        try {
            return await this.user.findOneAndUpdate({_id}, {$push: {messages: arg}}, {new: true})
        } catch (e) {
            return e.message
        }
    }

    async getUserChats(id) {
        try {
            let chats = await this.user.find({members: id});
            if(chats.length === 0) return 'have not chats';
            let rez = [];
            chats[0]['name'] = 'me'
            for(let i = 0; i < chats.length; i++) {
                let obj = chats[i];
                let interlocutorId = chats[i].members.filter(el => el !== id);
                interlocutorId = interlocutorId[0];
                let interlocutorName = await this.realUser.findOne({_id: interlocutorId});
                interlocutorName = interlocutorName.username;
                chats[i]['name'] = interlocutorName;
            }
            let result = [];
            for(let i = 0; i < chats.length; i++) {
                    let obj = {members: chats[i].members, messages: [chats[i].messages[chats[i].messages.length-1]], name: chats[i].name};
                    result.push(obj);
            }


            return result
        } catch (e) {
            return e.message
        }
    }
}

module.exports = ServiceMessage;
