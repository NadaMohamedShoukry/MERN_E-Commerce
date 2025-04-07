import { Box, Button, Container, Typography } from "@mui/material"
import done from "../assets/undraw_done_i0ak.svg";
import { useNavigate } from "react-router-dom";
const OrderSuccessPage =()=>{
    const navigate=useNavigate();
    const handleHomePage =()=>{
        navigate("/");
    }
    const handleCheckMyOrder =()=>{
        navigate("/orders");
    }
    return(
        <Container fixed sx={{marginTop:"50px"}}>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={3}>
                <img src={done} width="500px" height="400px"/>
        <Typography variant="h5" fontStyle="italic" >Order Placed Successfully </Typography>
        <Typography variant="h6" color="#343434" > We started processing it, continue your shopping </Typography>
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" gap={3}>
        <Button onClick={handleCheckMyOrder} variant="contained" sx={{backgroundColor:"#714329" }}>Check your Order</Button>
        <Button onClick={handleHomePage} sx={{color:"#714329" }}>Continue Shopping</Button>
        </Box>
        </Box>
        </Container>
    )
}
export default OrderSuccessPage;