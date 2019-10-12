var mongoose = require('../model');
class ServiceLeague {
    constructor() {
        var leagueSchema = new mongoose.Schema({
            title: String,
            description: String,
            season: String,
            users_id: Array
        });
        this.league = mongoose.model('League', leagueSchema);
    }

    async getSeasonRace(season) {
        let result = await this.league.aggregate([
                { $match : { season : season } },
                {
                    $project: {
                        _id: {
                            $toString: "$_id"
                        },
                        title: "$title",
                        description: "$description"
                    }
                },
                {
                    $lookup:
                        {
                            from: 'stages',
                            localField: '_id',
                            foreignField: 'league_id',
                            as: 'stagesArr'

                        }

                /*{
                    $unwind: {
                        path: "$stages",
                        preserveNullAndEmptyArrays: true
                    }*/
                }/*,
                {$group: {_id: "$stages"}}*/
                    ,
                {
                    $unwind: {
                        path: "$stagesArr",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        'stagesArr._id': {
                            $toString: "$stagesArr._id"
                        },
                        'stagesArr.title': "$stagesArr.title",
                        'stagesArr.description': "$stagesArr.description",
                        'stagesArr.location' : "$stagesArr.location"
                    }
                },
                {
                    $lookup: {
                        from: "races",
                        localField: "stagesArr._id",
                        foreignField: "stage_id",
                        as: "stagesArr.racesArray",
                    }
                }
            ],
            async function (err, response) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(response)
                }
            }
        )
        return Promise.resolve(result)
    }

    getLeague() {
        return this.league;
    }

    async getTable(_id) {
        try {
            return await this.league.findOne({_id});
        } catch (e) {
            return e.message
        }
    }

    createTable(title, description, season, users_id) {
        let user = new this.league({ title, description, season, users_id });
        user.save();
        return user;
    }

    async updateTable(_id, title, description, season, users_id) {
        try {
            return await this.league.findOneAndUpdate({_id}, {$set: {title, description, season, users_id}}, {new: true})
        } catch (e) {
            return e.message
        }
    }

    async deleteTable(id, stage, race) {
        let arrayOfStage = await stage.find({league_id: id});
        let arrayStagesId = [];
        if(arrayOfStage !== null) {
            arrayOfStage.forEach((el) => {
                arrayStagesId.push(el._id)
            });
            await stage.find({league_id: id}).remove();
        }

        await race.find({stage_id: arrayStagesId}).remove();
        try {
            return await this.league.findOneAndDelete({_id: id});
        } catch (e) {
            return e.message
        }
    }
}

module.exports = ServiceLeague;
