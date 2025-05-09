import { FC, PropsWithChildren, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "../../types/CartItem";
import { BASE_URL } from "../../constants/baseURL";
import { useAuth } from "../Auth/AuthContext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState("");
  const getCart = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Content_Type: "application/json",
        },
      });
      if (!response.ok) {
        setError("Failed to fetch user cart! Please try again");
      }
      const cart = await response.json();

      const cartItemsMapped = cart.items.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ product, quantity ,unitPrice}: { product: any; quantity: number;unitPrice:number }) => ({
          productId: product._id,
          title: product.title,
          productImage: product.image,
          unitPrice,
          quantity,
        })
      );
      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!token) {
      return;
    }
    getCart();
  }, [token]);
  const addItemToCart = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        //convert the body to string
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });
      if (!response.ok) {
        setError("Failed to add to Cart!");
      }

      const cart = await response.json();
      if (!cart) {
        setError("Failed to parse cart data!");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cartItemsMapped = cart.items.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ product, quantity,unitPrice }: { product: any; quantity: number ; unitPrice:number }) => ({
          productId: product._id,
          title: product.title,
          productImage: product.image,
          unitPrice,
          quantity,
        })
      );
      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };

  const updateItemInCart = async(productId:string , quantity:number)=>{
    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        //convert the body to string
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });
      if (!response.ok) {
        setError("Failed to update to Cart!");
      }

      const cart = await response.json();
      if (!cart) {
        setError("Failed to parse cart data!");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cartItemsMapped = cart.items.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ product, quantity,unitPrice }: { product: any; quantity: number ; unitPrice:number }) => ({
          productId: product._id,
          title: product.title,
          productImage: product.image,
          unitPrice,
          quantity,
        })
      );
      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }

  }
  const deleteItemFromCart =async(productId : string)=>{
    try {
      const response = await fetch(`${BASE_URL}/cart/items/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      
      });
      if (!response.ok) {
        setError("Failed to delete to Cart!");
      }

      const cart = await response.json();
      if (!cart) {
        setError("Failed to parse cart data!");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cartItemsMapped = cart.items.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ product, quantity,unitPrice }: { product: any; quantity: number ; unitPrice:number }) => ({
          productId: product._id,
          title: product.title,
          productImage: product.image,
          unitPrice,
          quantity,
        })
      );
      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }

  }
  const clearCart = async()=>{
    try {
      const response = await fetch(`${BASE_URL}/cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      
      });
      if (!response.ok) {
        setError("Failed to clear Cart!");
      }

      const cart = await response.json();
      if (!cart) {
        setError("Failed to parse cart data!");
      }
     
      setCartItems([]);
      setTotalAmount(0);
    } catch (error) {
      console.error(error);
    }

  }
  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart, updateItemInCart ,deleteItemFromCart,clearCart }}>
      {/* children is the application wraped inside the provider */}
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
