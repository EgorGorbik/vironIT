import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { League } from '../leagues/interfaces/league.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>,
              @InjectModel('League') private readonly leagueModel: Model<League>,
              ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id });
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
    };
    return await this.userModel.findOneAndDelete({_id: id});
  }

  async update(id: string, item: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, item, { new: true });
  }
}
