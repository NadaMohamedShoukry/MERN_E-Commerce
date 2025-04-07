import express from "express";
import { getMyOrders, login, register } from "../services/userService";
import { ExtendRequest, validateJWT } from "../middlewares/validateJWT";

const router = express.Router();

router.post("/register", async (request, response) => {
  try {
    const { firstName, lastName, email, password } = request.body;
    //Sending request data to register service function.
    const { statusCode, data } = await register({
      firstName,
      lastName,
      email,
      password,
    });
    response.status(statusCode).json(data);
  } catch (err) {
    response.status(500).send("Something went wrong!");
  }
});
router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    //Sending request data to login service function.
    const { statusCode, data } = await login({ email, password });
    response.status(statusCode).json(data);
  } catch (err) {
    response.status(500).send("Something went wrong!");
  }
});
router.get("/my-orders", validateJWT, async (request: ExtendRequest, response) => {
  try {
    //Get the user from JWT , after validating middleware.
    if (!request.user) {
      response.status(403).send("User Not Found");
      return;
    }
    //get active cart for a user.
    // Get the user from jwt , after validating from a middleware.
    const userId = request.user._id;
    const {data , statusCode} = await getMyOrders({ userId });
    response.status(statusCode).send(data);
  } catch (err) {
    response.status(500).send("Something went wrong!");
  }
});

export default router;
