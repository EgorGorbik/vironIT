import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param, UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './users.service';
import { User } from './interfaces/user.interface';
import { ApiImplicitParam, ApiModelProperty } from '@nestjs/swagger';
import { AuthGuard } from '../shared/auth.guard';
import { UserDec } from './user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('getRaces/')
  @UseGuards(new AuthGuard())
  getUserWithRace(@UserDec() user): Promise<User> {
    return this.userService.getUserWithRace(user);
  }

  @Get('getLeagues/:id')
  @ApiImplicitParam ({name: 'id'})
  getUserForLeague(@Param('id') id): Promise<User> {
    return this.userService.getUserForLeague(id);
  }

  @Get(':id')
  @ApiImplicitParam ({name: 'id'})
  findOne(@Param('id') id): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Post('login/:id')
  login(@Param('id') id): Promise<User> {
    return this.userService.login(id);
  }

  @Delete(':id')
  @ApiImplicitParam ({name: 'id'})
  delete(@Param('id') id): Promise<User> {
    return this.userService.delete(id);
  }

  @Put(':id')
  @ApiImplicitParam ({name: 'id'})
  update(@Body() updateUserDto: CreateUserDto, @Param('id') id): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }
}
