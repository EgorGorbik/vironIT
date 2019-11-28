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
        jwt.verify(req.token, 'access_token', async (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                let messages;
                messages = await this.message.getMessage([req.params.id, authData._id]);
                let result = [];
                let from = messages.messages.length-(req.params.n)*25;
                for(let i = from; i < from+25; i++) {
                    if(messages.messages[i] !== undefined) result.push(messages.messages[i])
                }
                res.send(result)
            }
        });
    }

    async getChatId(req, res) {
        jwt.verify(req.token, 'access_token', async (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                let messages;
                messages = await this.message.getChatId([req.params.id, authData._id]);
                res.send(messages._id)
            }
        });
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
