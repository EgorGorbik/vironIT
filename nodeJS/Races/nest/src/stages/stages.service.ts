import { Injectable } from '@nestjs/common';
import { Stage } from './interfaces/stage.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StagesService {
  constructor(@InjectModel('Stage') private readonly stageModel: Model<Stage>) {}

  async findAll(): Promise<Stage[]> {
    return await this.stageModel.find();
  }

  async findOne(id: string): Promise<Stage> {
    return await this.stageModel.findOne({ _id: id });
  }

  async create(user: Stage): Promise<Stage> {
    const newStage = new this.stageModel(user);
    return await newStage.save();
  }

  async delete(id: string): Promise<Stage> {
    return await this.stageModel.findByIdAndRemove(id);
  }

  async update(id: string, item: Stage): Promise<Stage> {
    return await this.stageModel.findByIdAndUpdate(id, item, { new: true });
  }
}
