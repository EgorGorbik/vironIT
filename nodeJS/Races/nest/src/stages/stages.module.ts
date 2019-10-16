import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StagesController } from './stages.controller';
import { StagesService } from './stages.service';
import { StageSchema } from './schemas/stage.schema';
import { RaceSchema } from '../races/schemas/race.schema';
import { LeagueSchema } from '../leagues/schemas/league.schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Stage', schema: StageSchema }]),
    MongooseModule.forFeature([{ name: 'Race', schema: RaceSchema }]),
    MongooseModule.forFeature([{ name: 'League', schema: LeagueSchema }])],
  controllers: [StagesController],
  providers: [StagesService],
})
export class StageModule {}
