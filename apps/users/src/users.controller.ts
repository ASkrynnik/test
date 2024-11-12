import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SharedService } from '@app/shared';

@Controller() 
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly sharedService: SharedService,
    @Inject('NOTIFICATIONS_SERVICE') private readonly notificationsService: ClientProxy
  ) {}

  @MessagePattern('createUser')
  async create(
    @Ctx() context: RmqContext,
    @Payload() createUserDto: CreateUserDto
  ) {
    this.sharedService.acknowledgeMessage(context);

    const createdUser = await this.usersService.create(createUserDto);

    this.usersService.sendDelayedMessage({ userId: createdUser.id, pattern: 'queuePush' });

    return createdUser;
  }

  @MessagePattern('findAllUsers')
  findAll(
    @Ctx() context: RmqContext
  ) {
    this.sharedService.acknowledgeMessage(context);
    
    return this.usersService.findAll();
  }

  @MessagePattern('findOneUser')
  findOne(
    @Ctx() context: RmqContext,
    @Payload() id: string
  ) {
    this.sharedService.acknowledgeMessage(context);

    return this.usersService.findOne(id);
  }

  @MessagePattern('updateUser')
  update(
    @Ctx() context: RmqContext,
    @Payload() updateUserDto: UpdateUserDto
  ) {
    this.sharedService.acknowledgeMessage(context);

    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern('removeUser')
  remove(
    @Ctx() context: RmqContext,
    @Payload() id: string
  ) {
    this.sharedService.acknowledgeMessage(context);

    return this.usersService.remove(id);
  }
}
