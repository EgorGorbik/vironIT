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
import { ApiImplicitParam } from '@nestjs/swagger';
import { UpdateRaceDto } from './dto/update-race.dto';

@Controller('races')
export class RacesController {
  constructor(private readonly raceService: RacesService) {}

  @Get()
  findAll(): Promise<Race[]> {
    return this.raceService.findAll();
  }

  @Get(':id')
  @ApiImplicitParam ({name: 'id'})
  findOne(@Param('id') id): Promise<Race> {
    return this.raceService.findOne(id);
  }

  @Post()
  create(@Body() createRaceDto: CreateRaceDto): Promise<Race> {
    return this.raceService.create(createRaceDto);
  }

  @Delete(':id')
  @ApiImplicitParam ({name: 'id'})
  delete(@Param('id') id): Promise<Race> {
    return this.raceService.delete(id);
  }

  @Put(':id')
  @ApiImplicitParam ({name: 'id'})
  update(@Body() updateRaceDto: UpdateRaceDto, @Param('id') id): Promise<Race> {
    return this.raceService.update(id, updateRaceDto);
  }
}
