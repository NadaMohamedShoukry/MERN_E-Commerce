import { createContext, useContext } from "react";
import { CartItem } from "../../types/CartItem";


interface CartContextType {
  cartItems:CartItem[];
  totalAmount:number;
  addItemToCart:(productId:string)=>void;
  updateItemInCart:(productId:string , quantity:number)=>void;
  deleteItemFromCart:(productId:string)=>void;

}

export const CartContext = createContext<CartContextType>({
    cartItems:[],
    totalAmount:0,
    addItemToCart:()=>{},
    updateItemInCart:()=>{},
    deleteItemFromCart:()=>{}

});

//Create a custom hook useAuth
//the returned context value is an object of username and token or null.

export const useCart = () => useContext(CartContext);

// createContext =>	Creates a container for shared data
// AuthContextType =>	Defines the shape of the context value
// AuthContext	=> The actual context object to be used with a provider
// useAuth() =>	A custom hook that reads the current context value easily
