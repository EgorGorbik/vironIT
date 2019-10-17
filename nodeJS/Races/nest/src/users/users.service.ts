import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { League } from '../leagues/interfaces/league.interface';
import { Race } from '../races/interfaces/race.interface';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>,
              @InjectModel('League') private readonly leagueModel: Model<League>,
              @InjectModel('Race') private readonly raceModel: Model<Race>,
              ) {}

  async getUserWithRace(user: User): Promise<User> {
    const result: User = await this.userModel.aggregate([
        {
          $project: {
            _id: {
              $toString: '$_id',
            },
            name: '$name',
            surname: '$surname',
            username: '$username',
          },
        },
        {
          $lookup:
            {
              from: 'races',
              localField: '_id',
              foreignField: 'userId',
              as: 'racesForThisUser',
            },
        },
        { $match : { _id : user['_id'] } },
      ],
    );
    return Promise.resolve(result);
  }

  async getUserForLeague(_id: string): Promise<User> {
    const result: User = await this.userModel.aggregate([
        {
          $project: {
            _id: {
              $toString: '$_id',
            },
            name: '$name',
            surname: '$surname',
            username: '$username',
          },
        },
        {
          $lookup:
            {
              from: 'leagues',
              localField: '_id',
              foreignField: 'usersId',
              as: 'leaguesForThisUser',

            },
        },
        { $match : {_id} },
      ],
    );
    return Promise.resolve(result);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(_id: string): Promise<User> {
    return await this.userModel.findOne({_id});
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async delete(id: string): Promise<User> {
    const tempLeague = await this.leagueModel.find({usersId: id});
    if (tempLeague !== null) {
      for (let i = 0; i < tempLeague.length; i++) {
        tempLeague[i].usersId.splice(tempLeague[i].usersId.indexOf(id), 1);
        await this.leagueModel.findOneAndUpdate({_id: tempLeague[i]._id}, tempLeague[i] );
      }
    }
    await this.raceModel.find({userId: id}).remove();
    const _id = id;
    return await this.userModel.findOneAndDelete({_id});
  }

  async update(id: string, item: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, item, { new: true });
  }

  async login(_id: string): Promise<User> {
    const user = await this.userModel.find({_id});
    return jwt.sign({user}, 'secret');
  }
}
