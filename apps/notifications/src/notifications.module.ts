import { Module } from '@nestjs/common'; 
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { SharedModule } from '@app/shared';

@Module({
  imports: [HttpModule, ConfigModule, SharedModule],
  providers: [NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}