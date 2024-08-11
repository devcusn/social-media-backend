import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/_core/prisma/prisma.service';
import { UserRegisterDto, UserLoginDto } from './models/dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async loginUser(data: UserLoginDto) {
    const userRes = await this.prisma.user.findFirst({
      where: {
        email: data.email,
        password: data.password,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (userRes) {
      return {
        statusCode: HttpStatus.OK,
        data: {
          access_token: await this.jwtService.signAsync(userRes),
        },
        message: 'User can access',
      };
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
