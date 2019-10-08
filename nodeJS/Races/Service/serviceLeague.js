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

    async getTable(id) {
        return await this.league.findOne({_id: id}) // TODO install Robo3T
    }

    createTable(title, description, season, users_id) {
        console.log(users_id)
        var user = new this.league({ title: title, description: description, season: season, users_id: users_id });
        user.save();
        return user;
    }

    async updateTable(id, title, description, season, users_id) {
        return await this.league.findOneAndUpdate({_id: id}, {$set: {title: title, description: description, season: season, users_id: users_id}}, {new: true})
    }

    async deleteTable(id, stage, race) {
        let k = await stage.find({league_id: id})
        let arrayStagesId = [];
        k.forEach((el, i) => {
            arrayStagesId.push(el._id)
        })
        console.log(arrayStagesId)
        //console.log(k)
        let t = await race.find({stage_id: arrayStagesId}).remove();
        console.log(t)
        await stage.find({league_id: id}).remove()
        await this.league.findOneAndDelete({_id: id});
    }

}

module.exports = ServiceLeague;
