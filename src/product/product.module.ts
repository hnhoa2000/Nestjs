import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryRepository } from 'src/category/reposiroties/category.repository';
import { CategorySchema } from 'src/category/schemas/category.schema';
import { ProductController } from './controllers/product.controller';
import { ProductRepository } from './repositories/product.reposirory';
import { ProductSchema } from './schemas/product.schema';
import { ProductService } from './services/product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductSchema,
      },
      {
        name: 'Category',
        schema: CategorySchema
      }
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, CategoryRepository]
})
export class ProductModule { }
