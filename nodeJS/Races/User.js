var mongoose = require('./model');
class User {
    constructor() {
        var usersSchema = new mongoose.Schema({
            name: String,
            surname: String,
            username: String
        });
        this.user = mongoose.model('User', usersSchema);
    }

   async getUserWithRace() {
       let result = await this.user.aggregate([
               {
                   $project: {
                       _id: {
                           $toString: "$_id"
                       },
                       name: "$name",
                       surname: "$surname",
                       username: "$username"
                   }
               },
                {
                    $lookup:
                        {
                            from: 'races',
                            localField: '_id',
                            foreignField: 'user_id',
                            as: 'racesForThisUser'

                        }
                },
               { $match : { _id : '5d9355cff9f67f1d14f27de1' } },
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



    async getUserForLeague() {
        let result = await this.user.aggregate([
                {
                    $project: {
                        _id: {
                            $toString: "$_id"
                        },
                        name: "$name",
                        surname: "$surname",
                        username: "$username"
                    }
                },
                {
                    $lookup:
                        {
                            from: 'leagues',
                            localField: '_id',
                            foreignField: 'users_id',
                            as: 'leaguesForThisUser'

                        }
                },
                { $match : { _id : '5d9355cff9f67f1d14f27de1' } },
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





    async getTable(id) {
        this.user.find(function (err, users) {
            console.log(users)
        })
        let k = this.user.findOne({_id: id});
        console.log(k)
        return k // TODO install Robo3T
    }

    createTable(name, surname, username) {
        var user = new this.user({ name: name, surname: surname, username: username});
        user.save();
        return user;
    }

    async updateTable(id, name, surname, username) {
        return await this.user.findOneAndUpdate({_id: id}, {$set: {name: name, surname: surname, username: username}}, {new: true})
    }

    async deleteTable(id, race, league) {
        let tempLeague = await league.findOne({users_id: id});
        tempLeague['users_id'].splice(tempLeague['users_id'].indexOf(id), 1)
        await league.findOneAndUpdate({_id: tempLeague['_id']}, tempLeague )
        await race.findOneAndDelete({user_id: id});
        await this.user.findOneAndDelete({_id: id});
    }

}

module.exports = User;
