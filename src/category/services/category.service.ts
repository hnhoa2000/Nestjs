import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { ServerMessage } from '../../common/constant';
import { CategoryDto } from '../dto/category.dto';
import { CategoryRepository } from '../reposiroties/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  async getCategoryById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(ServerMessage.INVALID_ID_FORMAT);
    }
    const category = await this.categoryRepository.findById(id);
    if (!category)
      throw new HttpException(ServerMessage.CATEGORY_NOT_FOUND, HttpStatus.BAD_REQUEST);
    return category;
  }

  async addCategory(newcategory: CategoryDto) {
    const category = await this.categoryRepository.findByCondition({ NameCategory: newcategory.NameCategory });
    if (category)
      throw new HttpException(ServerMessage.CATEGORY_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
    return this.categoryRepository.create(newcategory);
  }

  async updateCategory(id: string, updateCategory: CategoryDto) {
    await this.getCategoryById(id);
    return this.categoryRepository.findByIdAndUpdate(id, updateCategory);
  }

  async deleteCategory(id: string) {
    await this.getCategoryById(id);
    await this.categoryRepository.deleteOne(id);
    return {
      deleted: true
    };
  }

  async getAllCategory() {
    return this.categoryRepository.findAll();
  }
}
