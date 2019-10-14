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

@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leagueService: LeaguesService) {}

  @Get()
  findAll(): Promise<League[]> {
    return this.leagueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<League> {
    return this.leagueService.findOne(id);
  }

  @Post()
  create(@Body() createLeagueDto: CreateLeagueDto): Promise<League> {
    return this.leagueService.create(createLeagueDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<League> {
    return this.leagueService.delete(id);
  }

  @Put(':id')
  update(@Body() updateLeagueDto: CreateLeagueDto, @Param('id') id): Promise<League> {
    return this.leagueService.update(id, updateLeagueDto);
  }
}
