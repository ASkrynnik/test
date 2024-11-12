import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PostgresDBModule, SharedModule } from '@app/shared';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
 
@Module({
  imports: [
    SharedModule,
    PostgresDBModule,
    TypeOrmModule.forFeature([UserEntity]),
    SharedModule.registerRmq('NOTIFICATIONS_SERVICE', 'notifications')
  ],
  controllers: [UsersController],
  providers: [
    UsersRepository,
    UsersService
  ],
  exports: [UsersService]
})
export class UsersModule {} 
