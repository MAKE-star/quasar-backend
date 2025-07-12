import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards
} from '@nestjs/common';
import { Request } from 'express';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOrderDto } from '../auth/dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: Request
  ) {
    const user = req.user as { id: number; email: string }; 
    return this.ordersService.create(user.id, createOrderDto.items);
  }
}
