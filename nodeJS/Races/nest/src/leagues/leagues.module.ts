import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaguesController } from './leagues.controller';
import { LeaguesService } from './leagues.service';
import { LeagueSchema } from './schemas/league.schemas';
import { StageSchema } from '../stages/schemas/stage.schema';
import { RaceSchema } from '../races/schemas/race.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'League', schema: LeagueSchema }]),
    MongooseModule.forFeature([{ name: 'Stage', schema: StageSchema }]),
    MongooseModule.forFeature([{ name: 'Race', schema: RaceSchema }])],
  controllers: [LeaguesController],
  providers: [LeaguesService],
})
export class LeagueModule {}
