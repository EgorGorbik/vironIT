import { Injectable } from '@nestjs/common';
import { Race } from './interfaces/race.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RacesService {
  constructor(@InjectModel('Race') private readonly raceModel: Model<Race>,
  ) {}

  async findAll(): Promise<Race[]> {
    return await this.raceModel.find();
  }

  async findOne(id: string): Promise<Race> {
    return await this.raceModel.findOne({ _id: id });
  }

  async create(user: Race): Promise<Race> {
    const newUser = new this.raceModel(user);
    return await newUser.save();
  }

  async delete(id: string): Promise<Race> {
    return await this.raceModel.findByIdAndRemove(id);
  }

  async update(id: string, item: Race): Promise<Race> {
    return await this.raceModel.findByIdAndUpdate(id, item, { new: true });
  }
}
