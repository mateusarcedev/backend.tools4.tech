import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }

  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Get('check')
  checkFavorite(@Query('userId') userId: string, @Query('toolId') toolId: string) {
    return this.favoritesService.checkFavorite(parseInt(userId), toolId);
  }

  @Post('toggle')
  toggleFavorite(@Body() body: { userId: number; toolId: string }) {
    return this.favoritesService.toggleFavorite(body.userId, body.toolId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoritesService.remove(id);
  }
}