import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../../common/enum';
import { Roles } from '../../decorator';
import { RolesGuard } from '../../user/guards';
import { CreateProductDto, UpdateProductDto } from '../dto';
import { ProductService } from '../services/product.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async createProduct(@Body() newProduct: CreateProductDto) {
    const product = await this.productService.createProduct(newProduct);
    await this.cacheManager.reset();
    return product;
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async updateProduct(@Param('id') id: string, @Body() updateProduct: UpdateProductDto) {
    const product = await this.productService.updateProduct(id, updateProduct);
    await this.cacheManager.reset();
    return product;
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async deleteProduct(@Param('id') id: string) {
    const result = await this.productService.deleteProduct(id);
    await this.cacheManager.reset();
    return result;
  }

  @Get()
  async getAllProduct() {
    const value = await this.cacheManager.get('listProduct');
    if (!value) {
      const listProduct = await this.productService.getAllProduct();
      await this.cacheManager.set('listProduct', listProduct, 1000 * 60 * 60 * 24);
      return listProduct;
    }
    return value;
  }
}
