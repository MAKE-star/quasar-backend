import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entities';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async create(
    name: string,
    description: string,
    price: number,
    stock_quantity: number,
    image: string,
  ): Promise<Product> {
    const product = this.productRepository.create({
      name,
      description,
      price,
      stock_quantity,
      image,
    });
    return this.productRepository.save(product);
  }

  async seedProducts(): Promise<void> {
    const sampleProducts = [
      {
        id: 1,
        name: 'Wireless Headphones',
        description: 'High-quality sound with noise cancellation',
        price: 99.99,
        image:
          'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=600',
        stock_quantity: 10,
      },
      {
        id: 2,
        name: 'Smart Watch',
        description: 'Track your fitness and stay connected',
        price: 199.99,
        image:
          'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=600',
        stock_quantity: 15,
      },
      {
        id: 3,
        name: 'Laptop Backpack',
        description: 'Durable and stylish laptop protection',
        price: 49.99,
        image:
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
        stock_quantity: 20,
      },
      {
        id: 4,
        name: 'Coffee Maker',
        description: 'Brew the perfect cup every morning',
        price: 79.99,
        image:
          'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600',
        stock_quantity: 8,
      },
      {
        id: 5,
        name: 'Gaming Mouse',
        description: 'Precision control for pro gamers',
        price: 59.99,
        image:
          'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=600',
        stock_quantity: 12,
      },
      {
        id: 6,
        name: 'Bluetooth Speaker',
        description: 'Crystal clear sound on the go',
        price: 89.99,
        image:
          'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80',
        stock_quantity: 10,
      },
      {
        id: 7,
        name: 'Fashion Sneakers',
        description: 'Trendy sneakers perfect for casual outings',
        price: 69.99,
        image:
          'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600',
        stock_quantity: 0,
      },
      {
        id: 8,
        name: 'Hanging Plant Pot',
        description: 'Beautiful ceramic pot for your indoor garden',
        price: 29.99,
        image:
          'https://images.pexels.com/photos/31951801/pexels-photo-31951801.jpeg?auto=compress&cs=tinysrgb&w=600',
        stock_quantity: 18,
      },
    ];

    await this.productRepository.save(sampleProducts);
  }
}
