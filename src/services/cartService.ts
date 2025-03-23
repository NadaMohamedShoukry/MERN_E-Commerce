import { cartModel } from "../models/cartModel";
import { productModel } from "../models/productModel";

interface CreateCartForUser {
  userId: string;
}
const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface GetActiveCartForUser {
  userId: string;
}
export const getActiveCartForUser = async ({
  userId,
}: GetActiveCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });
  //New User or Empty cart for an old user.
  if (!cart) {
    cart = await createCartForUser({ userId });
  }
  return cart;
};
interface AddItemToCart {
  userId: string;
  productId: any;
  quantity: number;
}
export const addItemToCart = async ({
  userId,
  productId,
  quantity,
}: AddItemToCart) => {
  //Get the active cart of the user.
  const cart = await getActiveCartForUser({ userId });
  //p.product is a objectId ..should convert it to string.
  const existInCart = cart.items.find((p) => p.product.toString() === productId);
  if (existInCart) {
    return { data: "Item already exists in cart", statusCode: 400 };
  }

  //Fetch the product
  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "Product not found", statusCode: 400 };
  }
  if(product.stock < quantity){
    return {data:"Low Stock for Item" , statusCode : 400};
  }
  cart.items.push({ product: productId, unitPrice: product.price, quantity });
  cart.totalAmount += product.price * quantity;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};
