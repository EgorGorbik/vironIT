import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { ItemsModule } from './items/items.module';
import { UserModule } from './users/users.module';
import { LeagueModule } from './leagues/leagues.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './users/users.controller';
import { UserService } from './users/users.service';
import { LeaguesController } from './leagues/leagues.controller';
import { LeaguesService } from './leagues/leagues.service';
import config from './config/keys';

@Module({
  imports: [ItemsModule, UserModule, LeagueModule, MongooseModule.forRoot(config.mongoURI)],
  controllers: [AppController, ItemsController, UserController, LeaguesController],
  providers: [AppService, ItemsService, UserService, LeaguesService],
})
export class AppModule {}
