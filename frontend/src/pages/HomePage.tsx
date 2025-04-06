import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseURL";
import { Box } from "@mui/material";
const HomePage = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [error,setError]=useState(false);
  useEffect(() => {
    fetchProducs();
  }, []);

  const fetchProducs = async() => {
    try{
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();
        setProducts(data);
    }catch(err){
       setError(true);
       console.log(err);
    };
    
   
    
  };
  if(error){
    return <Box>Something went wrong! Please, try again later!</Box>

  }
  return (
    <Container fixed sx={{ marginTop: "20px" }}>
      <Grid container spacing={3}>
        {products.map((p) => (
          // On larger screens (md={4}), each card will take 1/3 of the row.

          // On mobile screens (xs={12}), each card will take the full row, ensuring it's centered.
          <Grid item md={4} xs={12} display="flex" justifyContent="center">
            <ProductCard {...p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default HomePage;
