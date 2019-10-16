import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RacesController } from './races.controller';
import { RacesService } from './races.service';
import { RaceSchema } from './schemas/race.schema';
import { StageSchema } from '../stages/schemas/stage.schema';
import { LeagueSchema } from '../leagues/schemas/league.schemas';
import { UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Race', schema: RaceSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Stage', schema: StageSchema }]),
    MongooseModule.forFeature([{ name: 'League', schema: LeagueSchema }])],
  controllers: [RacesController],
  providers: [RacesService],
})
export class RaceModule {}
