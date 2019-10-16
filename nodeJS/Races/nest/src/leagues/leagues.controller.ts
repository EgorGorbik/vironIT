import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateLeagueDto } from './dto/create-league.dto';
import { LeaguesService } from './leagues.service';
import { League } from './interfaces/league.interface';
import { ApiImplicitParam } from '@nestjs/swagger';

@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leagueService: LeaguesService) {}

  @Get()
  findAll(): Promise<League[]> {
    return this.leagueService.findAll();
  }

  @Get(':id')
  @ApiImplicitParam ({name: 'id'})
  findOne(@Param('id') id): Promise<League> {
    return this.leagueService.findOne(id);
  }

  @Get('getSeasonRaces/:season')
  @ApiImplicitParam ({name: 'season'})
  getSeasonRaces(@Param('season') season): Promise<League> {
    return this.leagueService.getSeasonRace(season);
  }

  @Post()
  create(@Body() createLeagueDto: CreateLeagueDto): Promise<League> {
    return this.leagueService.create(createLeagueDto);
  }

  @Delete(':id')
  @ApiImplicitParam ({name: 'id'})
  delete(@Param('id') id): Promise<League> {
    return this.leagueService.delete(id);
  }

  @Put(':id')
  @ApiImplicitParam ({name: 'id'})
  update(@Body() updateLeagueDto: CreateLeagueDto, @Param('id') id): Promise<League> {
    return this.leagueService.update(id, updateLeagueDto);
  }
}
