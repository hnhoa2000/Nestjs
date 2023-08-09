import { Body, Controller, Get, Param, Post, Put, ValidationPipe, UseGuards, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/common/enum';
import { Roles } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { CategoryDto } from '../dto/category.dto';
import { CategoryService } from '../services/category.service';
import { IsMongoId } from 'class-validator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async addCategory(@Body() newCategory: CategoryDto) {
    return this.categoryService.addCategory(newCategory);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async updateCategory(@Param('id') id: string, @Body() updateCategory: CategoryDto) {
    return this.categoryService.updateCategory(id, updateCategory);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }

  @Get()
  async getAllCategory() {
    return this.categoryService.getAllCategory(); 
  }
}
