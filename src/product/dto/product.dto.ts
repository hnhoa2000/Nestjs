import { IsNumber, IsString, IsNotEmpty, IsArray, IsOptional } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  NameProduct: String;

  @IsNotEmpty()
  @IsString()
  Description: String;

  @IsNotEmpty()
  @IsNumber()
  Price: Number;

  @IsNotEmpty()
  @IsString()
  Provider: String;

  @IsNotEmpty()
  @IsNumber()
  PublishingYear: Number;

  @IsNotEmpty()
  @IsString()
  PublishingCompany: String;

  @IsNotEmpty()
  @IsString()
  Category: String
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  NameProduct: String;

  @IsOptional()
  @IsString()
  Description: String;

  @IsOptional()
  @IsNumber()
  Price: Number;

  @IsOptional()
  @IsArray()
  Images: [String];

  @IsOptional()
  @IsString()
  Discount: String;
}