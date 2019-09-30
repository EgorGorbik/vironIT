var mongoose = require('./model');
class MongoService {
    constructor() {
        var usersSchema = new mongoose.Schema({
            name: String
        });
        this.user = mongoose.model('User', usersSchema);
    }

    async getUser(id) {
        this.user.find(function (err, users) {
            console.log(users)
        })
       return this.user.findOne({_id: id}) // TODO install Robo3T
    }

    createUser(name) {
        var user = new this.user({ name: name });
        user.save();
        return user;
    }

    async updateUser(id, name) {
        await this.user.findOneAndUpdate({_id: id}, {$set: {name: name}})
    }

    async deleteUser(id) {
        await this.user.findOneAndDelete({_id: id});
    }

}

module.exports = MongoService;
