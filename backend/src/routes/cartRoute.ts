import express, { request, response } from "express";
import {
  addItemToCart,
  checkout,
  clearCart,
  deleteItemFromCart,
  getActiveCartForUser,
  updateItemInCart,
} from "../services/cartService";
import { ExtendRequest, validateJWT } from "../middlewares/validateJWT";
const router = express.Router();
//NOW the request has an object named user and his data.
router.get("/", validateJWT, async (request: ExtendRequest, response) => {
  try {
    //Get the user from JWT , after validating middleware.
    if (!request.user) {
      response.status(403).send("User Not Found");
      return;
    }
    //get active cart for a user.
    // Get the user from jwt , after validating from a middleware.
    const userId = request.user._id;
    const cart = await getActiveCartForUser({ userId , populateProduct: true});
    response.status(200).send(cart);
  } catch (err) {
    response.status(500).send("Something went wrong!");
  }
});

router.delete("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const response = await clearCart({ userId });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
});

router.post("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
});
router.put("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await updateItemInCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
});
//you can add many parameters if you need this /items/:id/:another
router.delete(
  "/items/:productId",
  validateJWT,
  async (req: ExtendRequest, res) => {
    try {
      const userId = req?.user?._id;
      //path parameters.
      const { productId } = req.params;
      const response = await deleteItemFromCart({ userId, productId });
      res.status(response.statusCode).send(response.data);
    } catch (err) {
      res.status(500).send("Something went wrong!");
    }
  }
);
router.post("/checkout", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { address } = req.body;

    const response = await checkout({ userId, address });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
});

export default router;
