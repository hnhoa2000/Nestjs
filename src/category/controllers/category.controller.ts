import { Body, Controller, Get, Param, Post, Put, UseGuards, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../../common/enum';
import { Roles } from '../../decorator/roles.decorator';
import { RolesGuard } from '../../user/guards/roles.guard';
import { CategoryDto } from '../dto/category.dto';
import { CategoryService } from '../services/category.service';

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
