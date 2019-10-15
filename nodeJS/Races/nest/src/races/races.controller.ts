import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateRaceDto } from './dto/create-race.dto';
import { RacesService } from './races.service';
import { Race } from './interfaces/race.interface';
import { UserService } from '../users/users.service';

@Controller('races')
export class RacesController {
  constructor(private readonly raceService: RacesService) {}

  @Get()
  findAll(): Promise<Race[]> {
    return this.raceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Race> {
    return this.raceService.findOne(id);
  }

  @Post()
  create(@Body() createRaceDto: CreateRaceDto): Promise<Race> {
    return this.raceService.create(createRaceDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Race> {
    return this.raceService.delete(id);
  }

  @Put(':id')
  update(@Body() updateRaceDto: CreateRaceDto, @Param('id') id): Promise<Race> {
    return this.raceService.update(id, updateRaceDto);
  }
}
