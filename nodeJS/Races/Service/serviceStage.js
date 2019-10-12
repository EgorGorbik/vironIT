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
        try {
            return await this.stage.findOne({_id});
        } catch (e) {
            return e.message
        }
    }

    async createTable(title, description, location, league_id, league) {
        let stagesLeague;
        try {
            stagesLeague = await league.findOne({_id: league_id});
        } catch (e) {
            return e.message
        }
        if(stagesLeague === null) {
            return 'This league does not exist'
        }
        let user = new this.stage({title, description, location, league_id});
        user.save();
        return user;
    }

    async updateTable(_id, title, description, location, league_id, league) {
        let stagesLeague;
        try {
            stagesLeague = await league.findOne({_id: league_id});
        } catch (e) {
            return 'This league does not exist'
        }
        if(stagesLeague === null) {
            return 'This league does not exist'
        }
        try {
            return await this.stage.findOneAndUpdate({_id}, {$set: {title, description, location, league_id}}, {new: true});
        } catch (e) {
            return e.message
        }

    }

    async deleteTable(id, race) {
        await race.findOneAndDelete({stage_id: id});
        try {
            return await this.stage.findOneAndDelete({_id: id});
        } catch (e) {
            return e.message
        }
    }

}

module.exports = ServiceStage;
