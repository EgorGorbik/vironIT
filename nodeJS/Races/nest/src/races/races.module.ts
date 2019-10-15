import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RacesController } from './races.controller';
import { RacesService } from './races.service';
import { RaceSchema } from './schemas/race.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Race', schema: RaceSchema }])],
  controllers: [RacesController],
  providers: [RacesService],
})
export class RaceModule {}
