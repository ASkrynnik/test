import { Module } from '@nestjs/common'; 
import { SharedModule } from '@app/shared';
import { GatewayController } from './gateway.controller';

@Module({ 
  imports: [
    SharedModule.registerRmq('USER_SERVICE', 'users')
  ],
  controllers: [GatewayController],
})
export class GatewayModule {}