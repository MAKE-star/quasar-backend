import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service'; 

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService, 
  ) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const result = await this.authService.login(body.email, body.password);

    const user = await this.usersService.findByEmail(body.email);
    console.log('[Login Controller] Retrieved user from DB:', user);

    if (!user) {
    throw new Error('User not found');
  }

    return {
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
      },
      token: result.access_token,
    };
  }

  @Post('logout')
  async logout() {
    return { message: 'Logged out successfully' };
  }
}
