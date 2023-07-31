import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './controllers/category.controller';
import { CategoryDto } from './dto/category.dto';
import { CategoryRepository } from './reposiroties/category.repository';
import { CategorySchema } from './schemas/category.schema';
import { CategoryService } from './services/category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Category',
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, CategoryDto]
})
export class CategoryModule { }
