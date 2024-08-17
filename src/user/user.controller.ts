import { Body, Controller, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { SendFriendRequestDto } from './models/dto';

@Controller('user')
export class UserController {
  constructor(private authService: UserService) {}
  @Post('/user/friends/request')
  async sendFridendRequest(@Body() data: SendFriendRequestDto) {
    const id = 10;
    const res = await this.authService.sendFriendRequest({
      receiverId: data.receiverId,
      senderId: id,
    });
    return res;
  }
  @Put('/user/friends/request/accept')
  async acceptFriendRequest(@Body() data: SendFriendRequestDto) {
    const id = 10;
    const res = await this.authService.sendFriendRequest({
      receiverId: data.receiverId,
      senderId: id,
    });
    return res;
  }
  @Put('/user/friends/request/reject')
  async rejectFriendRequest(@Body() data: SendFriendRequestDto) {
    const id = 10;
    const res = await this.authService.sendFriendRequest({
      receiverId: data.receiverId,
      senderId: id,
    });
    return res;
  }
}
