import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ToolsService {
  constructor(private prisma: PrismaService) { }

  // Cria uma nova ferramenta
  async create(createToolDto: CreateToolDto) {
    return this.prisma.tool.create({
      data: {
        name: createToolDto.name,
        link: createToolDto.link,
        iconUrl: createToolDto.iconUrl,
        description: createToolDto.description,
        categoryID: createToolDto.categoryID,
        suggestedBy: createToolDto.suggestedBy, // Opcional, se a ferramenta foi sugerida por alguém
      },
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
