import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { ItemsModule } from './items/items.module';
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
  imports: [ItemsModule, UserModule, LeagueModule, StageModule, RaceModule, MongooseModule.forRoot(config.mongoURI)],
  controllers: [AppController, ItemsController, UserController, LeaguesController, StagesController, RacesController],
  providers: [AppService, ItemsService, UserService, LeaguesService, StagesService, RacesService],
})
export class AppModule {}
