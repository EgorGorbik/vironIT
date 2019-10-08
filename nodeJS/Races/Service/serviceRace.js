var mongoose = require('../model');
class ServiceRace {
    constructor() {
        var raceSchema = new mongoose.Schema({
            time: Number,
            description: String,
            title: String,
            user_id: String,
            stage_id: String
        });
        this.race = mongoose.model('Race', raceSchema);
    }

    async getTable(id) {
        return await this.race.findOne({_id: id}) // TODO install Robo3T
    }

    getRace() {
        return this.race;
    }

    createTable(time, description, title, user_id, stage_id) {
        var user = new this.race({ time: time, description: description, title: title, user_id: user_id, stage_id: stage_id });
        user.save();
        return user;
    }

    async updateTable(id, time, description, title) {
        return await this.race.findOneAndUpdate({_id: id}, {$set: {time: time, description: description, title: title}}, {new: true})
    }

    async deleteTable(id) {
        await this.race.findOneAndDelete({_id: id});
    }

}

module.exports = ServiceRace;
