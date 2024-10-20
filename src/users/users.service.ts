import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async createOrUpdateUser(createUserDto: CreateUserDto) {
    const { githubId, name, email, avatar } = createUserDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { githubId }, // Usar githubId diretamente como Int
    });

    if (existingUser) {
      return this.prisma.user.update({
        where: { githubId }, // Usar githubId diretamente como Int
        data: { name, email, avatar },
      });
    }

    return this.prisma.user.create({
      data: { githubId, name, email, avatar }, // Usar githubId diretamente como Int
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(githubId: number) { // Alterar o tipo para number
    return this.prisma.user.findUnique({
      where: { githubId }, // Usar githubId diretamente como Int
    });
  }

  update(githubId: number, updateUserDto: UpdateUserDto) { // Alterar o tipo para number
    return this.prisma.user.update({
      where: { githubId }, // Usar githubId diretamente como Int
      data: updateUserDto,
    });
  }

  remove(githubId: number) { // Alterar o tipo para number
    return this.prisma.user.delete({
      where: { githubId }, // Usar githubId diretamente como Int
    });
  }
}
