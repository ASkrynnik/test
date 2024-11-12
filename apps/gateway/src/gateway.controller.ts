import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class GatewayController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

  @Post('users') 
  async register(@Body('username') username: string) {
    return this.userService.send(
      'createUser',
      {
        username,
      },
    );
  }

  @Get('users')
  async getUsers() {
    return this.userService.send(
      'findAllUsers',
      {},
    );
  }

  @Get('users/:id')
  async addFriend(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException();
    }

    return this.userService.send(
      'findOneUser',
      {
        id,
      },
    );
  }

  @Patch('users/:id')
  async updateUser(@Param('id') id: string, @Body('username') username: string) {
    if (!id || !username) {
      throw new BadRequestException();
    }

    return this.userService.send(
      'updateUser',
      {
        id,
        username,
      },
    );
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException();
    }

    return this.userService.send(
      'removeUser',
      {
        id,
      },
    );
  }
}
