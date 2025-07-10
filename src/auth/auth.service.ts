import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common'
import { Repository } from 'typeorm';
import { User } from '../entities/user.entities';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // async register(name: string, email: string, password: string) {
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const user = this.userRepository.create({ name, email, password: hashedPassword });
  //   await this.userRepository.save(user);
  //   return { message: 'User registered successfully' };
  // }

  async register(dto: CreateUserDto) {
  const { first_name, last_name, email, phone, password, confirmPassword, acceptTerms } = dto

  // Validate terms
  if (!acceptTerms) {
    throw new BadRequestException('You must accept the terms and conditions')
  }

  // Validate password match
  if (password !== confirmPassword) {
    throw new BadRequestException('Passwords do not match')
  }

  // Check if user already exists
  const existingUser = await this.userRepository.findOne({ where: { email } })
  if (existingUser) {
    throw new BadRequestException('Email is already in use')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = this.userRepository.create({
    first_name,
    last_name,
    email,
    phone,
    password: hashedPassword,
    acceptTerms
  })

  await this.userRepository.save(user)

  return { message: 'User registered successfully' }
}


  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}