import { Injectable } from '@nestjs/common';
import { Race } from './interfaces/race.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { League } from '../leagues/interfaces/league.interface';
import { User } from '../users/interfaces/user.interface';
import { Stage } from '../stages/interfaces/stage.interface';
import { UpdateRaceDto } from './dto/update-race.dto';

@Injectable()
export class RacesService {
  constructor(@InjectModel('Race') private readonly raceModel: Model<Race>,
              @InjectModel('User') private readonly userModel: Model<User>,
              @InjectModel('Stage') private readonly stageModel: Model<Stage>,
              @InjectModel('League') private readonly leagueModel: Model<League>,
  ) {}

  async findAll(): Promise<Race[]> {
    return await this.raceModel.find();
  }

  async findOne(id: string): Promise<Race> {
    return await this.raceModel.findOne({ _id: id });
  }

  async additionalValidation(race) {
    let tempStage;
    try {
      tempStage = await this.stageModel.findOne({_id: race.stageId});
    } catch (e) {
      return 'гонки по данному id не существует';
    }
    if (tempStage === null) {
      return 'гонки по данному id не существует';
    }
    const leagueID = tempStage.leagueId;
    const tempLeague = await this.leagueModel.findOne({_id: leagueID});
    const arrayUserID = tempLeague.usersId;
    if (arrayUserID.indexOf(race.userId) !== -1) {
      return true;
    } else {
      return 'user не из этой лиги';
    }
  }

  async create(race: Race): Promise<any> {
    const resultOfValidation = await this.additionalValidation(race);
    if (resultOfValidation === true) {
      const newRace = new this.raceModel(race);
      return await newRace.save();
    } else {
      return resultOfValidation;
    }
  }

  async delete(id: string): Promise<Race> {
    return await this.raceModel.findByIdAndRemove(id);
  }

  async update(id: string, race: UpdateRaceDto): Promise<any> {
    const resultOfValidation = await this.additionalValidation(race);
    if (resultOfValidation === true) {
      return await this.raceModel.findByIdAndUpdate(id, race, { new: true });
    } else {
      return resultOfValidation;
    }
  }
}
