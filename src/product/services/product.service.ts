import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { CategoryRepository } from '../../category/reposiroties/category.repository';
import { ServerMessage } from '../../common/constant';
import { CreateProductDto, UpdateProductDto } from '../dto';
import { ProductRepository } from '../repositories/product.reposirory';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository
  ) { }

  async createProduct(newProduct: CreateProductDto) {
    const category = await this.categoryRepository.findByCondition({ NameCategory: newProduct.Category });
    const product = await this.productRepository.create({
      NameProduct: newProduct.NameProduct,
      Description: newProduct.Description,
      Price: newProduct.Price,
      Provider: newProduct.Provider,
      PublishingYear: newProduct.PublishingYear,
      PublishingCompany: newProduct.PublishingCompany,
      IdCategory: category._id
    });
    await this.categoryRepository.updateMany({ _id: category._id }, { $push: { Products: product._id } })
    return product;
  }

  async getProductById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(ServerMessage.INVALID_ID_FORMAT);
    }
    const product = await this.productRepository.findById(id);
    if (!product)
      throw new HttpException(ServerMessage.CATEGORY_NOT_FOUND, HttpStatus.BAD_REQUEST);
    await product.populate([
      { path: 'IdCategory', select: 'NameCategory -_id' }
    ]);
    return product;

  }

  async updateProduct(id: string, updateProduct: UpdateProductDto) {
    await this.getProductById(id);
    return this.productRepository.findByIdAndUpdate(id, updateProduct);
  }

  async deleteProduct(id: string) {
    await this.getProductById(id);
    await this.productRepository.deleteOne(id);
    return {
      deleted: true
    }
  }

  async getAllProduct() {
    return this.productRepository.findAll();
  }
}
