const joi = require('joi');
const Message= require('./message.service');
const jwt = require('../config/jwt');


class messageController {
    constructor() {
        this.message = new Message();
        this.schemaMessage = joi.object().keys({
            friendRequests: joi.array(),
            sentFriendRequests: joi.array()
        });
    }

    async getMessages(req, res) {
        let messages;
        messages = await this.message.getMessage(req.body);
        res.send(messages)
    }

    async getChats(req, res) {
        let rez =  await this.message.getUserChats(req.params.id);
        res.send(rez)
    }

    async createMessage(req, res) {
        let result =  this.message.createTable(req.body);
        res.send(result);
    }

    async updateMessage(req, res) {
        let rezult;
        rezult = this.message.updateTable(req.params.id, req.body);
        res.send(rezult);
    }

}

module.exports = messageController;
