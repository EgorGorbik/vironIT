import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaguesController } from './leagues.controller';
import { LeaguesService } from './leagues.service';
import { LeagueSchema } from './schemas/league.schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'League', schema: LeagueSchema }])],
  controllers: [LeaguesController],
  providers: [LeaguesService],
})
export class LeagueModule {}
