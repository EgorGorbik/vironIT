import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { LeagueModule } from './leagues/leagues.module';
import { StageModule } from './stages/stages.module';
import { RaceModule } from './races/races.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './users/users.controller';
import { UserService } from './users/users.service';
import { LeaguesController } from './leagues/leagues.controller';
import { LeaguesService } from './leagues/leagues.service';
import { StagesController } from './stages/stages.controller';
import { StagesService } from './stages/stages.service';
import { RacesController } from './races/races.controller';
import { RacesService } from './races/races.service';
import config from './config/keys';

@Module({
  imports: [UserModule, LeagueModule, StageModule, RaceModule, MongooseModule.forRoot(config.mongoURI)],
  controllers: [AppController, UserController, LeaguesController, StagesController, RacesController],
  providers: [AppService, UserService, LeaguesService, StagesService, RacesService],
})
export class AppModule {}
