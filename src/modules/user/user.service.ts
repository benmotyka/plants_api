import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '.prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOneById(id: string): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        id
      },
    });
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive'
        }
      },
    });
  }

  async createUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<User> {
    return await this.prisma.user.create({
      data: {
        username,
        password,
      },
    });
  }
}
