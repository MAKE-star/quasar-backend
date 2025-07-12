import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getProfile(user: any) {
    return this.userRepository.findOne({
      where: { id: user.id },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        acceptTerms: true,
      },
      relations: ['orders'], 
    });
  }

  async findByEmail(email: string): Promise<User | null> {
  return this.userRepository.findOne({
    where: { email },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
}

}
