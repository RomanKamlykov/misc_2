import { Schema } from 'mongoose';

export const ItemSchema = new Schema({
  name: String,
  discription: String,
  qty: Number,
});
