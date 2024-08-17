import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_core/prisma/prisma.service';
import { SendFriendRequestModel } from './models/dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
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
}
