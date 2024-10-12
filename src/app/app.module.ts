import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { ToolsModule } from 'src/tools/tools.module';
import { UsersModule } from 'src/users/users.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { SuggestionsModule } from 'src/suggestions/suggestions.module';

@Module({
  imports: [PrismaModule, CategoriesModule, ToolsModule, UsersModule, FavoritesModule, SuggestionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
