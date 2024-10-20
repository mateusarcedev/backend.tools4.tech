import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async createOrUpdateUser(createUserDto: CreateUserDto) {
    const { githubId, name, email, avatar } = createUserDto;

    const githubIdString = githubId.toString();

    const existingUser = await this.prisma.user.findUnique({
      where: { githubId: githubIdString },
    });

    if (existingUser) {
      return this.prisma.user.update({
        where: { githubId: githubIdString },
        data: { name, email, avatar },
      });
    }

    return this.prisma.user.create({
      data: { githubId: githubIdString, name, email, avatar },
    });
  }


  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(githubId: string) {
    return this.prisma.user.findUnique({
      where: { githubId: githubId.toString() },
    });
  }

  update(githubId: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { githubId: githubId.toString() },
      data: updateUserDto,
    });
  }

  remove(githubId: string) {
    return this.prisma.user.delete({
      where: { githubId: githubId.toString() },
    });
  }

}
