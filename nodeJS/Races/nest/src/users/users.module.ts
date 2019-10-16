import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { UserSchema } from './schemas/user.schema';
import { LeagueSchema } from '../leagues/schemas/league.schemas';
import { RaceSchema } from '../races/schemas/race.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'League', schema: LeagueSchema }]),
    MongooseModule.forFeature([{ name: 'Race', schema: RaceSchema }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
