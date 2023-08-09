import { Schema, Document } from 'mongoose';

const ProductSchema = new Schema(
  {
    NameProduct: String,
    Description: String,
    Price: Number,
    Provider: String,
    Discount: String,
    PublishingYear: Number,
    PublishingCompany: String,
    Followers: Number,
    Images: [String],
    IdCategory: { type: Schema.Types.ObjectId, ref: 'Category' }
  },
  {
    collection: 'products',
  },
);

export { ProductSchema };

export interface Product extends Document {
  NameCategory: string
}
