import { Injectable } from '@nestjs/common';
import { League } from './interfaces/league.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Race } from '../races/interfaces/race.interface';
import { Stage } from '../stages/interfaces/stage.interface';

@Injectable()
export class LeaguesService {
  constructor(@InjectModel('League') private readonly leagueModel: Model<League>,
              @InjectModel('Stage') private readonly stageModel: Model<Stage>,
              @InjectModel('Race') private readonly raceModel: Model<Race>,
  ) {}

  async findAll(): Promise<League[]> {
    return await this.leagueModel.find();
  }

  async getSeasonRace(season): Promise<League> {
    const result = await this.leagueModel.aggregate([
        { $match : { season } },
        {
          $project: {
            _id: {
              $toString: '$_id',
            },
            title: '$title',
            description: '$description',
          },
        },
        {
          $lookup:
            {
              from: 'stages',
              localField: '_id',
              foreignField: 'leagueId',
              as: 'stagesArr',

            },

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
            path: '$stagesArr',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            'stagesArr._id': {
              $toString: '$stagesArr._id',
            },
            'stagesArr.title': '$stagesArr.title',
            'stagesArr.description': '$stagesArr.description',
            'stagesArr.location' : '$stagesArr.location',
          },
        },
        {
          $lookup: {
            from: 'races',
            localField: 'stagesArr._id',
            foreignField: 'stageId',
            as: 'stagesArr.racesArray',
          },
        },
      ],
    );
    return Promise.resolve(result);
  }

  async findOne(_id: string): Promise<League> {
    return await this.leagueModel.findOne({_id});
  }

  async create(user: League): Promise<League> {
    const newLeague = new this.leagueModel(user);
    return await newLeague.save();
    }

  async delete(id: string): Promise<League> {
    const arrayOfStage = await this.stageModel.find({leagueId: id});
    const arrayStagesId = [];
    if (arrayOfStage !== null) {
      arrayOfStage.forEach((el) => {
        arrayStagesId.push(el._id);
      });
      await this.stageModel.find({leagueId: id}).remove();
    }
    await this.raceModel.find({stageId: arrayStagesId}).remove();
    return await this.leagueModel.findByIdAndRemove(id);
  }

  async update(id: string, item: League): Promise<League> {
    return await this.leagueModel.findByIdAndUpdate(id, item, { new: true });
  }
}
