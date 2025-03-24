import { cartModel, ICartItem } from "../models/cartModel";
import { IOrderItem, orderModel } from "../models/orderModel";
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

interface ClearCart {
  userId: string;
}
export const clearCart = async ({ userId }: ClearCart) => {
  const cart = await getActiveCartForUser({ userId });
  cart.items = [];
  cart.totalAmount = 0;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
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
  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  //calculate the total price of items exist in cart
  let total = calculateCartTotalItems({ cartItems: otherCartItems });
  //Updated quantity
  existInCart.quantity = quantity;
  //adding the updated item quantity with its unit price to the total
  total += existInCart.quantity * existInCart.unitPrice;
  //Update totalAmount of the cart
  cart.totalAmount = total;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};

interface DeleteItemFromCart {
  userId: string;
  productId: any;
}
export const deleteItemFromCart = async ({
  userId,
  productId,
}: DeleteItemFromCart) => {
  //Get the active cart of the user.
  const cart = await getActiveCartForUser({ userId });
  //p.product is a objectId ..should convert it to string.
  const existInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );
  if (!existInCart) {
    return { data: "Item doesn't exist in cart", statusCode: 400 };
  }

  //calculate the number of items in the cart without  the item too be deleted.
  //filter out the deleted item
  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  //calculate the total price of items exist in cart
  let total = calculateCartTotalItems({ cartItems: otherCartItems });
  cart.items = otherCartItems;
  cart.totalAmount = total;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};

const calculateCartTotalItems = ({ cartItems }: { cartItems: ICartItem[] }) => {
  //calculate the total price of items exist in cart
  let total = cartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);
  return total;
};

interface Checkout {
  userId: string;
  address: string;
}
export const checkout = async ({ userId, address }: Checkout) => {
  if (!address) {
    return { data: "Please enter your address", statusCode: 400 };
  }
  const cart = await getActiveCartForUser({ userId });

  const orderItems: IOrderItem[] = [];
  //Loop cartItems and create orderItem
  for (const item of cart.items) {
    //item.product =>  productId
    const product = await productModel.findById(item.product);
    if (!product) {
      return { data: "Product does not exist", statusCode: 400 };
    }

    const orderItem: IOrderItem = {
      productTitle: product.title,
      productImage: product.image,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    };
    orderItems.push(orderItem);
  }
  const order = await orderModel.create({
    orderItems,
    total: cart.totalAmount,
    address,
    userId,
  });

  await order.save();
  //Update the cart status to be complete.
  cart.status="completed",
  await cart.save();
  return { data : order , statusCode:200};
};
