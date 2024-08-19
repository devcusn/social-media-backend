import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { SendFriendRequestDto } from './models/dto';
import { User } from 'src/_core/decorators/user.decorator';
import { Public } from 'src/_core/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Public()
  @Get('/all')
  async getAllUser() {
    const res = await this.userService.getAllUser();
    return res;
  }
  @Post('/user/friends/request')
  async sendFridendRequest(@Body() data: SendFriendRequestDto) {
    const id = 10;
    const res = await this.userService.sendFriendRequest({
      receiverId: data.receiverId,
      senderId: id,
    });
    return res;
  }
  @Put('/user/friends/request/accept')
  async acceptFriendRequest(@Body() data: SendFriendRequestDto) {
    const id = 10;
    const res = await this.userService.sendFriendRequest({
      receiverId: data.receiverId,
      senderId: id,
    });
    return res;
  }
  @Put('/user/friends/request/reject')
  async rejectFriendRequest(@Body() data: SendFriendRequestDto) {
    const id = 10;
    const res = await this.userService.sendFriendRequest({
      receiverId: data.receiverId,
      senderId: id,
    });
    return res;
  }

  @Get('/profile')
  async getUserProfile(@User() user) {
    const res = await this.userService.getUserProfile(user);
    return res;
  }
  @Get('/current')
  async getCurrentUser(@User() user) {
    const { email, username } = user;
    return {
      data: {
        email,
        username,
      },
    };
  }
}
