var mongoose = require('./model');
class Stage {
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

    async getTable(id) {
        this.stage.find(function (err, users) {
            console.log(users)
        })
        return this.stage.findOne({_id: id}) // TODO install Robo3T
    }

    createTable(title, description, location, id) {
        var user = new this.stage({ title: title, description: description, location: location, league_id: id });
        user.save();
        return user;
    }

    async updateTable(id, title, description, location, league_id) {
        return await this.stage.findOneAndUpdate({_id: id}, {$set: {title: title, description: description, location: location, league_id: league_id}}, {new: true})
    }

    async deleteTable(id, race) {
        await race.findOneAndDelete({stage_id: id});
        await this.stage.findOneAndDelete({_id: id});
    }

}

module.exports = Stage;
