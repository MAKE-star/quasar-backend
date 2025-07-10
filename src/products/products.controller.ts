import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Post()
  async create(
    @Body()
    body: {
      name: string;
      description: string;
      price: number;
      stock_quantity: number;
      image: string;
    },
  ) {
    return this.productsService.create(
      body.name,
      body.description,
      body.price,
      body.stock_quantity,
      body.image,
    );
  }

  @Get('seed')
  async seed() {
    await this.productsService.seedProducts();
    return { message: 'Products seeded!' };
  }
}
