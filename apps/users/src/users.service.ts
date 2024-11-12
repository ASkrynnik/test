import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import * as amqp from 'amqplib';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new UserEntity(createUserDto);
    const createdUser = await this.usersRepository.create(user);

    return createdUser
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  findOne(id: string) {
    return this.usersRepository.findOne({id});
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.findOneAndUpdate({id}, updateUserDto)
  }

  remove(id: string) {
    return this.usersRepository.findOneAndDelete({id})
  }

  async sendDelayedMessage(message: any) {
    console.log('Sending delayed message:', message);
    
    const connection = await amqp.connect('amqp://rabbitmq:5672');
    const channel = await connection.createChannel();

    await channel.assertExchange('notifications_delayed', 'x-delayed-message', {
      arguments: { 'x-delayed-type': 'direct' },
    });

    channel.publish(
      'notifications_delayed',
      'notifications',
      Buffer.from(JSON.stringify(message)),
      {
        headers: {
          'x-delay': 86400000,
          'pattern': message.pattern,
        },
      }
    );

    await channel.close();
    await connection.close();
  }
}
