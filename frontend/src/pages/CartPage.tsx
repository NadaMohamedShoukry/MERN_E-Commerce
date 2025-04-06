import Typography  from "@mui/material/Typography";
import  Container from "@mui/material/Container"
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseURL";
import { useAuth } from "../context/Auth/AuthContext";

const CartPage =()=>{
    const {token}=useAuth();
    const [cart , setCart]=useState();
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
            setCart(data);
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
        </Container>
    )
}

export default CartPage;