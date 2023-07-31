import { Schema, Document } from 'mongoose';

const CategorySchema = new Schema(
  {
    NameCategory: { type: String}
  },
  {
    collection: 'categories',
  },
);

export { CategorySchema };

export interface Category extends Document {
  NameCategory: string
}
