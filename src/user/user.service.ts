import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/_core/prisma/prisma.service';
import { SendFriendRequestModel } from './models/dto';
import { getRandomNumber } from 'src/utils/random';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getAllUser() {
    try {
      const res = await this.prisma.user.findMany();
      return res;
    } catch (err) {
      throw new NotFoundException('users not found');
    }
  }
  async sendFriendRequest(data: SendFriendRequestModel) {
    try {
      await this.prisma.friendRequest.create({
        data: {
          senderId: data.senderId,
          receiverId: data.receiverId,
        },
      });
      return { status: true };
    } catch (err) {
      throw Error(err);
    }
  }
  async acceptFriendRequest(data: SendFriendRequestModel) {
    try {
      await this.prisma.friendRequest.update({
        where: {
          senderId_receiverId: {
            senderId: data.senderId,
            receiverId: data.receiverId,
          },
        },
        data: {
          status: 'ACCEPTED',
        },
      });
      return { status: true };
    } catch (err) {
      throw new Error(err);
    }
  }
  async rejectFriendRequest(data: SendFriendRequestModel) {
    try {
      await this.prisma.friendRequest.update({
        where: {
          senderId_receiverId: {
            senderId: data.senderId,
            receiverId: data.receiverId,
          },
        },
        data: {
          status: 'REJECTED',
        },
      });
      return { status: true };
    } catch (err) {
      throw new Error(err);
    }
  }
  async getAllReceiverRequests(userId: number) {
    try {
      const receivedRequests = await this.prisma.friendRequest.findMany({
        where: {
          receiverId: userId,
          status: 'PENDING',
        },
        include: {
          sender: true,
        },
      });

      return {
        data: receivedRequests,
      };
    } catch (err) {
      throw new Error(err);
    }
  }
  async getAllSentRequests(userId: number) {
    try {
      const sentRequests = await this.prisma.friendRequest.findMany({
        where: {
          senderId: userId,
          status: 'PENDING',
        },
        include: {
          receiver: true,
        },
      });

      return {
        data: sentRequests,
      };
    } catch (err) {
      throw new Error(err);
    }
  }
  async getAllUserFriends(userId: number) {
    try {
      const sentRequests = await this.prisma.friendRequest.findMany({
        where: {
          senderId: userId,
          status: 'ACCEPTED',
        },
        include: {
          receiver: true,
        },
      });

      return {
        data: sentRequests,
      };
    } catch (err) {
      throw new Error(err);
    }
  }
  async deleteFriend(data: SendFriendRequestModel) {
    try {
      const deletedFriendRequest = await this.prisma.friendRequest.deleteMany({
        where: {
          OR: [
            {
              senderId: data.senderId,
              receiverId: data.receiverId,
            },
            {
              senderId: data.receiverId,
              receiverId: data.senderId,
            },
          ],
        },
      });

      return { status: true, deletedCount: deletedFriendRequest.count };
    } catch (err) {
      throw new Error(err);
    }
  }
  getUserProfile = (user: any) => {
    try {
      return {
        data: {
          username: user.username,
          email: user.email,
          following: getRandomNumber(100, 500),
          followers: getRandomNumber(0, 200),
          posts: getRandomNumber(0, 50),
          name: 'enes şiirin',
          bio: `Hello I am enes ${user.usernmae}`,
        },
      };
    } catch (err) {
      throw new Error(err);
    }
  };
}
