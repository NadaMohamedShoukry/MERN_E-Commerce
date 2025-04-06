import Typography  from "@mui/material/Typography";
import  Container from "@mui/material/Container"
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseURL";
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/Cart/CartContext";
import Box from "@mui/material/Box";

const CartPage =()=>{
    const {token}=useAuth();
     const {cartItems , totalAmount}=useCart();
     const [error,setError]=useState("");

    const getCart = async ()=>{
        try{
            const response=await fetch(`${BASE_URL}/cart`,{
                headers:{
                    "Authorization":`Bearer ${token}`,
                    "Content_Type":"application/json",
                }
            });
            if(!response.ok){
                setError("Failed to fetch user cart! Please try again")
            }
            const data = await response.json();
           
            console.log(data);

        }catch(error){
            console.log(error)
        }
    }
    useEffect (()=>{
        if(!token){
            return;
        }
        getCart();

    },[token])
    return(
        <Container sx={{ marginTop: "20px" }}>
         <Typography variant="h2">Hello Cart </Typography>
         {cartItems.map((item)=>(
            <Box>{item.title}</Box>
         ))}
        </Container>
    )
}

export default CartPage;