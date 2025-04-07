import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useCart } from "../context/Cart/CartContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { TextField } from "@mui/material";
import { BASE_URL } from "../constants/baseURL";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems, totalAmount } = useCart();
  const { token } = useAuth();
  const addressRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState("");
  const navigate=useNavigate();
  const confirmOrder = async () => {
    try {
      const address = addressRef.current?.value;
      if (!address) {
        setError("Unable to place your order ! Please, Enter your address!");
        return;
      }
      const response = await fetch(`${BASE_URL}/cart/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        //convert the body to string
        body: JSON.stringify({
          address,
        }),
      });
   
      if (!token) {
        setError("Incorrect Token!");
        return;
      }

      if (!response.ok) {
        setError("Unable to connect! ");
      }
      navigate("/order-success");
    } catch (error) {
      console.error(error);
      setError("Something went wrong! try again later");
    }
  };
  const handleConfirmOrder = () => {
    confirmOrder();
  };

  return (
    <Container fixed sx={{ marginTop: "20px" }}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h4"
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
          borderColor: "#714329",
          padding: 2,
          marginBottom: "20px",
           boxShadow:"0px 0px 7px 0px #714329"
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: "7px" }}>
        <Typography variant="h6" sx={{ textAlign: "left", color: "	#343434" }}>
          Enter your Address:
        </Typography>
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
            onClick={handleConfirmOrder}
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
