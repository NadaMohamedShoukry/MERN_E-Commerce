import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useCart } from "../context/Cart/CartContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRef } from "react";
import { TextField } from "@mui/material";

const CheckoutPage = () => {
  const { cartItems, totalAmount } = useCart();
  const addressRef = useRef<HTMLInputElement>(null);

  return (
    <Container fixed sx={{ marginTop: "20px" }}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h3"
          fontStyle="italic"
          color="#714329"
          marginBottom={2}
        >
          Checkout
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        sx={{
          border: 1,
          borderRadius: 5,
          borderColor: "brown",
          padding: 2,
          marginBottom:"20px"
        }}
      >
        {cartItems.map((item) => (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              width="100%"
              gap={2}
            >
              <img src={item.productImage} width={80} />
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Typography variant="h6" fontWeight="500">
                  {item.title}
                </Typography>
                <Typography fontWeight="200">
                  {item.quantity} * {item.unitPrice} EGP
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}

        <Typography variant="h5" sx={{ textAlign: "right" }}>
          Total Amount :{totalAmount.toFixed(2)} EGP
        </Typography>
      </Box>
      <Box sx={{display:'flex' , flexDirection:'column' , gap:"7px"}}>
        <Typography variant= "h6" sx={{ textAlign: "left", color:"	#343434"}}>Enter your Address:</Typography>
        <TextField
          inputRef={addressRef}
          label="Delivery Address"
          name="address"
          fullWidth
        ></TextField>
        <Box
          sx={{
            display: "flex",

            justifyContent: "center",
            padding: "10px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#714329",
              color: "white",
              marginTop: "15px",
              width: "500px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Confirm Order
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
