import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";

import { BASE_URL } from "../constants/baseURL";
import { useAuth } from "../context/Auth/AuthContext";
import loginImage from "../assets/undraw_sign-in_uva.svg";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/register");
  };
  const registerCall = async () => {
    try {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      //validate credentials
      if (!email || !password) {
        setError("Check submitted data!");
        return;
      }

      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Missing header added
        },
        //convert the body to string
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const token = await response.json();
      if (!token) {
        setError("Incorrect Token!");
        return;
      }

      login(email, token);

      navigate("/");
      if (!response.ok) {
        setError("Unable to connect! Please, try different credientials!");
      }
    } catch (error) {
      setError("Something went wrong!");
      console.log("Something went wrong", error);
    }
  };
  const onSubmit = async () => {
    await registerCall();
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        {/* <Typography variant="h3" sx={{ color: "#714329", fontStyle: "italic" }}>
          Register New Account
        </Typography> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: 2,
            border: "2px solid #eee",
            borderRadius: "10px",
            padding: "50px",
            boxShadow: 3,
          }}
        >
          <img src={loginImage} alt="welcome" width="300" />

          <TextField
            inputRef={emailRef}
            label="Email"
            name="email"
            sx={{
              "& label.Mui-focused": {
                color: "#714329",
              },
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#714329",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#714329",
                },
              },
            }}
          />
          <TextField
            inputRef={passwordRef}
            type="Password"
            label="Password"
            name="password"
            sx={{
              "& label.Mui-focused": {
                color: "#714329",
              },
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#714329",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#714329",
                },
              },
            }}
          />
          <Button
            onClick={onSubmit}
            variant="contained"
            sx={{ backgroundColor: "#B08463", boxShadow: 3 }}
          >
            Login
          </Button>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
          <Typography>
            Don't have an account?
            <Button
              onClick={handleSignUp}
              sx={{ color: "#714329", fontWeight: "600" }}
            >
              Sign up
            </Button>{" "}
          </Typography>
          {/* <h6>Already have an acounl ? Login</h6> */}
        </Box>
      </Box>
    </Container>
  );
};
export default LoginPage;
