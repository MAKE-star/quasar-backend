import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { NotificationsModule } from './notifications/notifications.module';
import { User } from './entities/user.entities';
import { Product } from './entities/product.entities';
import { Order } from './entities/order.entities';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [User, Product, Order],
        synchronize: true, 
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false, 
          },
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    OrdersModule,
    ProductsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
