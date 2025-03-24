import express, { request } from "express";
import { getAllProducts } from "../services/productService";

const router = express.Router();
router.get("/", async (request, response) => {
  try {
    const products = await getAllProducts();
    response.status(200).send(products);
  } catch (err) {
    response.status(500).send("Something went wrong!");
  }
});

export default router;
