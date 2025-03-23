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
  const existInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );
  if (existInCart) {
    return { data: "Item already exists in cart", statusCode: 400 };
  }

  //Fetch the product
  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "Product not found", statusCode: 400 };
  }
  if (product.stock < quantity) {
    return { data: "Low Stock for Item", statusCode: 400 };
  }
  cart.items.push({ product: productId, unitPrice: product.price, quantity });
  cart.totalAmount += product.price * quantity;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};

interface UpdateItemInCart {
  userId: string;
  productId: any;
  quantity: number;
}
export const updateItemInCart = async ({
  userId,
  productId,
  quantity,
}: UpdateItemInCart) => {
  //Get the active cart of the user.
  const cart = await getActiveCartForUser({ userId });
  //p.product is a objectId ..should convert it to string.
  const existInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );
  if (!existInCart) {
    return { data: "Item doesn't exist in cart", statusCode: 400 };
  }
  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "Product not found", statusCode: 400 };
  }
  if (product.stock < quantity) {
    return { data: "Low Stock for Item", statusCode: 400 };
  }

  //calculate the number of items in the cart before updating the total amount.
  //filter out the updated item
  const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId);
  console.log(otherCartItems);
  //calculate the total price of items exist in cart
  let total = otherCartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);
  //Updated quantity
  existInCart.quantity = quantity;
  //adding the updated item quantity with its unit price to the total
  total += existInCart.quantity * existInCart.unitPrice;
  //Update totalAmount of the cart
  cart.totalAmount=total;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};
