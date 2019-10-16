import { Injectable } from '@nestjs/common';
import { Stage } from './interfaces/stage.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Race } from '../races/interfaces/race.interface';
import { League } from '../leagues/interfaces/league.interface';

@Injectable()
export class StagesService {
  constructor(@InjectModel('Stage') private readonly stageModel: Model<Stage>,
              @InjectModel('Race') private readonly raceModel: Model<Race>,
              @InjectModel('League') private readonly leagueModel: Model<League>,
  ) {}

  async findAll(): Promise<Stage[]> {
    return await this.stageModel.find();
  }

  async findOne(id: string): Promise<Stage> {
    return await this.stageModel.findOne({ _id: id });
  }

  async create(stage: Stage): Promise<Stage> {
    try {
      await this.leagueModel.findOne({_id: stage.leagueId});
    } catch (e) {
      return e.message;
    }
    const newStage = new this.stageModel(stage);
    return await newStage.save();
  }

  async delete(id: string): Promise<Stage> {
    await this.raceModel.find({stageId: id}).remove();
    return await this.stageModel.findByIdAndRemove(id);
  }

  async update(id: string, stage: Stage): Promise<Stage> {
    try {
      await this.leagueModel.findOne({_id: stage.leagueId});
    } catch (e) {
      return e.message;
    }
    return await this.stageModel.findByIdAndUpdate(id, stage, { new: true });
  }
}
