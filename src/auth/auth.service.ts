import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/_core/prisma/prisma.service';
import { UserRegisterDto, UserLoginDto } from './models/dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async loginUser(data: UserLoginDto) {
    const res = await this.prisma.user.findFirst({
      where: {
        email: data.email,
        password: data.password,
      },
    });
    if (res) {
      return true;
    } else {
      throw new NotFoundException('User not found');
    }
  }
  async createUser(data: UserRegisterDto) {
    try {
      await this.prisma.user.create({
        data: {
          email: data.email,
          username: data.username,
          password: data.password,
          profile: {
            create: {},
          },
        },
      });
      return true;
    } catch (err) {
      throw Error(err);
    }
  }
  async checkUser() {
    try {
      const res = this.prisma.user.findFirst({
        where: {
          email: 'asdfas',
        },
      });
      return res;
    } catch (err) {}
  }

  async updatePassword() {
    try {
      console.log('hellooo');
    } catch (err) {
      console.log('');
    }
  }
}
