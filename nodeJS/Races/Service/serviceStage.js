var mongoose = require('../model');
class ServiceStage {
    constructor() {
        var stageSchema = new mongoose.Schema({
            title: String,
            description: String,
            location: String,
            league_id: String
        });
        this.stage = mongoose.model('Stage', stageSchema);
    }

    getStage() {
        return this.stage;
    }

    async getTable(_id) {
        return await this.stage.findOne({_id}) // TODO install Robo3T
    }

    createTable(title, description, location, league_id) {
        var user = new this.stage({ title, description, location, league_id });
        user.save();
        return user;
    }

    async updateTable(_id, title, description, location, league_id) {
        return await this.stage.findOneAndUpdate({_id}, {$set: {title, description, location, league_id}}, {new: true})
    }

    async deleteTable(id, race) {
        await race.findOneAndDelete({stage_id: id});
        await this.stage.findOneAndDelete({_id: id});
    }

}

module.exports = ServiceStage;
