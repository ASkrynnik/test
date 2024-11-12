import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async sendNotificationWithDelay(id: string) {
    const webhookUrl = 'https://webhook.site/2fc25a5c-48a1-4660-a1ad-c3eb64403586';
    console.log('Sending push webhook to:', webhookUrl);
      setTimeout(() => {
        this.httpService.post(webhookUrl, { id })
          .pipe(
        catchError((error: AxiosError) => {
          console.error('Error sending push notification:', error);
          throw error;
        })
          ).subscribe();
      }, 10000);

  }
}
