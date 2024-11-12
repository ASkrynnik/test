import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { SharedService } from '@app/shared';
import { NotificationsService } from './notifications.service';

@Controller() 
export class NotificationsController {
  constructor(
    private readonly sharedService: SharedService,
    private readonly notificationsService: NotificationsService
  ) {}
  @MessagePattern('queuePush')
  handleNotification(@Ctx() context: RmqContext, @Payload() data: any) {
    this.sharedService.acknowledgeMessage(context);

    this.notificationsService.sendNotificationWithDelay(data.userId);
  }
}
