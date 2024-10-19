import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { ApiAcceptedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ToolEntity } from './entities/tool.entity';

@Controller('tools')
@ApiTags("Tools")
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) { }

  @Post()
  @ApiAcceptedResponse({ type: ToolEntity, isArray: true }) // A resposta ainda será um array
  create(@Body() createToolDto: CreateToolDto | CreateToolDto[]) {

    if (Array.isArray(createToolDto)) {
      return this.toolsService.create(createToolDto);
    } else {
      return this.toolsService.create([createToolDto]);
    }
  }

  @Get()
  @ApiOkResponse({ type: ToolEntity, isArray: true })
  findAll() {
    return this.toolsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ToolEntity })
  findOne(@Param('id') id: string) {
    return this.toolsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ToolEntity })
  update(@Param('id') id: string, @Body() updateToolDto: UpdateToolDto) {
    return this.toolsService.update(id, updateToolDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ToolEntity })
  remove(@Param('id') id: string) {
    return this.toolsService.remove(id);
  }
}
