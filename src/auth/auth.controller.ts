import { Body, Controller, Get, Post, Put } from '@nestjs/common';

import { PrismaService } from 'src/_core/prisma/prisma.service';
import { UserLoginDto, UserRegisterDto } from './models/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}
  @Post('/login')
  async login(@Body() data: UserLoginDto) {
    const res = await this.authService.loginUser(data);
    return res;
  }
  @Post('/register')
  async register(@Body() data: UserRegisterDto) {
    const res = await this.authService.createUser(data);
    return res;
  }
  @Put('/update/password')
  async updatePassword() {
    return 'update password';
  }
  @Post('/reset/password')
  async resetPasswor() {
    return 'reset password';
  }
}
