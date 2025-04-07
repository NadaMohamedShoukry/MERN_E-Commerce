import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useCart } from "../context/Cart/CartContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Delete from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import emptyCart from '../assets/undraw_empty-cart_574u.svg'

const CartPage = () => {
  const { cartItems, totalAmount, updateItemInCart,deleteItemFromCart,clearCart } = useCart();
  const handleQuantity =(productId:string , quantity:number)=>{
    if(quantity <= 0){
        return;
    }
    updateItemInCart(productId,quantity);
  }

  const handleDeleteItem =(productId:string)=>{
    deleteItemFromCart(productId)
  }
  const handleClearCart =()=>{
    clearCart()
  }
 
  return (
    <Container fixed sx={{ marginTop: "20px" }}>
        {cartItems.length===0 ? (
            <Box display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={3}
            >
             <img src={emptyCart} alt="welcome" width="500" />
             <Typography variant="h4">Your Cart is Empty! Start Shopping Now</Typography>
             </Box>
        ):(
            <>
        <Box  display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          >
      <Typography variant="h3"  fontStyle='italic' color="#B08463" marginBottom={2}>My Cart </Typography>
      <IconButton onClick={handleClearCart}><Delete /></IconButton>
      </Box>
      <Box  display='flex' flexDirection='column' gap={4} >
      {cartItems.map((item) => (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          height='100px'

          sx={
            {
                border:1,
                borderRadius:5,
                borderColor:"brown",
                padding:2,

            }
          }
        >
        <Box display='flex' flexDirection='row' alignItems='center' gap={2}>
          <img src={item.productImage} width={80} />
          <Box>
          <Typography variant="h6" fontWeight="500">{item.title}</Typography>
          <Typography fontWeight="200">
            {item.quantity} * {item.unitPrice} EGP
          </Typography>
          <IconButton onClick={()=>handleDeleteItem(item.productId)}><Delete /></IconButton>
          </Box>
          </Box>
            <Box display='flex' flexDirection='row' gap={2}>
            <Button onClick={()=>handleQuantity(item.productId , item.quantity+1)} sx={{ backgroundColor: "#B08463", color:"white"}}>+</Button>
            <Button onClick={()=>handleQuantity(item.productId , item.quantity-1)} sx={{ backgroundColor: "#B08463" , color:"white"}}>-</Button>
            </Box>
        </Box>
      ))}
      <Box>
        <Typography variant="h5">Total Amount :{totalAmount.toFixed(2)} EGP</Typography>
      </Box>
      </Box>
      </>
      )
      }
        
    </Container>
  );
};

export default CartPage;
