var mongoose = require('../config/model');
class ServiceMessage {
    constructor() {
        this.user = mongoose.model('Message');
        this.realUser = mongoose.model('User');
    }

    async getMessage(arr) {
        try {
            return await this.user.findOne({members: { $in: arr }});
        } catch (e) {
            return e.message
        }
    }

    createTable(userArg) {
        console.log(userArg)
        let user = new this.user(userArg);
        user.save();
        return user;
    }

    async updateTable(_id, arg) {
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
                console.log('id ', interlocutorId)
                let interlocutorName = await this.realUser.findOne({_id: interlocutorId});
                console.log('name ', interlocutorName)
                interlocutorName = interlocutorName.username;
                console.log('nname ', interlocutorName);
                chats[i]['name'] = interlocutorName;
            }
            console.log(chats);
            console.log(rez);
            return chats
        } catch (e) {
            return e.message
        }
    }
}

module.exports = ServiceMessage;
