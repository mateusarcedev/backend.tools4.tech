import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ToolsService {
  constructor(private prisma: PrismaService) { }

  // Cria uma nova ferramenta
  async create(createToolDtos: CreateToolDto[]) {
    // Use createMany para criar múltiplas ferramentas
    return this.prisma.tool.createMany({
      data: createToolDtos.map(dto => ({
        name: dto.name,
        link: dto.link,
        description: dto.description,
        categoryID: dto.categoryID,
      })),
    });
  }

  // Lista todas as ferramentas
  async findAll() {
    return this.prisma.tool.findMany();
  }

  // Encontra uma ferramenta pelo ID
  async findOne(id: string) {
    const tool = await this.prisma.tool.findUnique({ where: { id } });
    if (!tool) {
      throw new NotFoundException('Tool not found');
    }
    return tool;
  }

  // Atualiza uma ferramenta
  async update(id: string, updateToolDto: UpdateToolDto) {
    const tool = await this.prisma.tool.findUnique({ where: { id } });
    if (!tool) {
      throw new NotFoundException('Tool not found');
    }
    return this.prisma.tool.update({
      where: { id },
      data: updateToolDto,
    });
  }

  // Remove uma ferramenta
  async remove(id: string) {
    const tool = await this.prisma.tool.findUnique({ where: { id } });
    if (!tool) {
      throw new NotFoundException('Tool not found');
    }
    return this.prisma.tool.delete({ where: { id } });
  }
}
