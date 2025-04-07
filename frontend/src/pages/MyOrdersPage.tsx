import { Box, Button, Container, Typography } from "@mui/material"

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect } from "react";
const MyOrdersPage =()=>{
    const navigate=useNavigate();
    const {getMyOrders , myOrders} = useAuth();
    useEffect(()=>{
        getMyOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    console.log(myOrders);
    const handleHomePage =()=>{
        navigate("/");
    }
    return(
        <Container fixed sx={{marginTop:"50px"}}>
                <Typography
          variant="h4"
          fontStyle="italic"
          color="#714329"
          marginBottom={2}
        >
          Previous Orders
        </Typography>
          {myOrders.map((item)=>(
            
            <Box sx={
                {
                    border:1,
                    borderColor:"#714329",
                    padding:"20px",
                    margin:"25px",
                    borderRadius:"10px",
                     boxShadow:"0px 0px 7px 0px #714329"
                }
            }>
          
                <Typography>Address : {item.address}</Typography>
                <Typography>Total : {item.total.toFixed(2)} EGP</Typography>
                <Typography>Order Items : {item.orderItems.length}</Typography>
            </Box>
          ))}
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" gap={3}>
      
        <Button onClick={handleHomePage} sx={{color:"#714329" }}>Continue Shopping</Button>
        </Box>
       
        </Container>
    )
}
export default MyOrdersPage;