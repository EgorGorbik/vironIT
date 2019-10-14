import { Injectable } from '@nestjs/common';
import { League } from './interfaces/league.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LeaguesService {
  constructor(@InjectModel('League') private readonly leagueModel: Model<League>) {}

  async findAll(): Promise<League[]> {
    return await this.leagueModel.find();
  }

  async findOne(id: string): Promise<League> {
    return await this.leagueModel.findOne({ _id: id });
  }

  async create(user: League): Promise<League> {
    const newLeague = new this.leagueModel(user);
    return await newLeague.save();
  }

  async delete(id: string): Promise<League> {
    return await this.leagueModel.findByIdAndRemove(id);
  }

  async update(id: string, item: League): Promise<League> {
    return await this.leagueModel.findByIdAndUpdate(id, item, { new: true });
  }
}
