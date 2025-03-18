import mongoose, { Schema,ObjectId, Document } from "mongoose";
import { IProduct } from "./productModel";

//will not use the TS enum , will use an array
const CartStatusEnum =["active" , "completed"];
export interface ICartItem extends Document {
  product: IProduct;
  unitPrice: number;
  quantity: number;
}

export interface ICart extends Document {
  userId: ObjectId |string;
  item: ICartItem[];
  totalAmount: number;
  status: "active" | "completed";
}

const cartItemSchema = new Schema<ICartItem>({
  //has a reference to product.
  //ref => should be set to the same name as prosduct model.
  //required should be true without it there will be no cart.
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const cartSchema =new Schema<ICart>({
    userId:{type: Schema.Types.ObjectId, ref:"User",required:true},
    item:[cartItemSchema],
    totalAmount:{type:Number , required:true },
    status:{type:String , enum:CartStatusEnum ,default:"active"},

})

export const cartModel = mongoose.model<ICart>('Cart' ,cartSchema);