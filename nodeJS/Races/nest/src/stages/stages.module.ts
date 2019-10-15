import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StagesController } from './stages.controller';
import { StagesService } from './stages.service';
import { StageSchema } from './schemas/stage.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Stage', schema: StageSchema }])],
  controllers: [StagesController],
  providers: [StagesService],
})
export class StageModule {}
