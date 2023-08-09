import { Schema, Document } from 'mongoose';
import {Product} from '../../product/schemas/product.schema'

const CategorySchema = new Schema(
  {
    NameCategory: String,
    Products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
  },
  {
    collection: 'categories',
  },
);

export { CategorySchema };

export interface Category extends Document {
  NameCategory: string,
  Products:[Product]
}
