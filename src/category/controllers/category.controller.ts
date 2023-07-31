import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/common/enum';
import { Roles } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { CategoryDto } from '../dto/category.dto';
import { CategoryService } from '../services/category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async addCategory(@Req() req: any, @Body() category: CategoryDto) {
    console.log(req.user);
    return this.categoryService.addCategory(category);
  }

  @Get()
  async getAllCaategory() {
    return this.categoryService.getAllCaategory();
  }
}
