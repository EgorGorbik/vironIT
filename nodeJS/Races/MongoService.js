var mongoose = require('./model');
class MongoService {
    constructor() {
        var usersSchema = new mongoose.Schema({
            name: String,
            surname: String,
            username: String
        });
        this.user = mongoose.model('User', usersSchema);
    }

    async getUser(id) {
        this.user.find(function (err, users) {
            console.log(users)
        })
       return this.user.findOne({_id: id}) // TODO install Robo3T
    }

    createUser(name, surname, username) {
        var user = new this.user({ name: name, surname: surname, username: username });
        user.save();
        return user;
    }

    async updateUser(id, name, surname, username) {
        await this.user.findOneAndUpdate({_id: id}, {$set: {name: name, surname: surname, username: username}})
    }

    async deleteUser(id) {
        await this.user.findOneAndDelete({_id: id});
    }

}

module.exports = MongoService;
