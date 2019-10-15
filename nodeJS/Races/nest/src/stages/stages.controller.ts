import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateStageDto } from './dto/create-stage.dto';
import { StagesService } from './stages.service';
import { Stage } from './interfaces/stage.interface';

@Controller('stages')
export class StagesController {
  constructor(private readonly stageService: StagesService) {}

  @Get()
  findAll(): Promise<Stage[]> {
    return this.stageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Stage> {
    return this.stageService.findOne(id);
  }

  @Post()
  create(@Body() createStageDto: CreateStageDto): Promise<Stage> {
    return this.stageService.create(createStageDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Stage> {
    return this.stageService.delete(id);
  }

  @Put(':id')
  update(@Body() updateStageDto: CreateStageDto, @Param('id') id): Promise<Stage> {
    return this.stageService.update(id, updateStageDto);
  }
}
