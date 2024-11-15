import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { ConfigService } from '@nestjs/config';
import { SharedService } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);

  const configService = app.get(ConfigService);
  const sharedService = app.get(SharedService);

  const queue = configService.get('RABBITMQ_NOTIFICATIONS_QUEUE');

  app.connectMicroservice(sharedService.getRmqOptions('notifications'));
  app.startAllMicroservices();
}
bootstrap();
