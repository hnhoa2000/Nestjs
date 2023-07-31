import { IsNotEmpty, IsString } from "class-validator";

export class CategoryDto {
  @IsNotEmpty()
  @IsString()
  NameCategory: string;
}