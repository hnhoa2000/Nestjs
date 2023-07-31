import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryDto } from '../dto/category.dto';
import { CategoryRepository } from '../reposiroties/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) { }
  async addCategory(newcategory: CategoryDto) {
    const category = await this.categoryRepository.findByCondition({ NameCategory: newcategory.NameCategory });
    if (category)
      throw new HttpException('Category already exists', HttpStatus.BAD_REQUEST);
    return this.categoryRepository.create(newcategory);
  }

  async getAllCaategory() {
    return this.categoryRepository.findAll();
  }
}
