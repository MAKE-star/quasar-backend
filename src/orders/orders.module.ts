import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entities';
import { Product } from '../entities/product.entities';
import { User } from '../entities/user.entities';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controllers';
import { NotificationsService } from '../notifications/notifications.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, User])],
  controllers: [OrdersController],
  providers: [OrdersService, NotificationsService],
})
export class OrdersModule {}