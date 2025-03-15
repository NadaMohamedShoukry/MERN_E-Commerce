import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import productRoute from "./routes/productRoute"
import { seedInitialProducts } from "./services/productService";
const app = express();
const port = 3001;
//built in middleware to convert json format to be added in request.body
app.use(express.json())

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("Mongo Connected"))
  .catch((error)=> console.log("Failed to connect",error));

//seed the products to database.
seedInitialProducts();

app.use('/user',userRoutes);
app.use('/products',productRoute);

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)
})
