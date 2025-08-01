import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entities';
import { Product } from '../entities/product.entities';
import { User } from '../entities/user.entities';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private notificationsService: NotificationsService,
  ) {}

  async create(
    userId: number,
    items: { productId: number; quantity: number; price: number }[],
  ): Promise<Order> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new BadRequestException('User not found');

    const productIds = items.map((item) => item.productId);
    const products = await this.productRepository.findByIds(productIds);

    if (products.length !== productIds.length) {
      throw new BadRequestException('Some products not found');
    }

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = this.orderRepository.create({
      user,
      products,
      total,
      createdAt: new Date(),
    });

    const savedOrder = await this.orderRepository.save(order);

    const orderSummary = items
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        const name = product?.name || 'Unnamed Product';
        return `${item.quantity}x ${name} ($${item.price.toFixed(2)})`;
      })
      .join(', ');

    const message =
      `Your order #${savedOrder.id} has been placed successfully.\n\n` +
      `It contains: ${orderSummary}.\n` +
      `Total: $${total.toFixed(2)}.\n\n` +
      `Thank you for shopping with us!`;

    await this.notificationsService.sendEmail(
      user.email,
      'Order Confirmation',
      message,
    );

    // await this.notificationsService.sendSMS(
    //   user.phone || '+2349052368651',
    //   message,
    // );

    return savedOrder;
  }
}
