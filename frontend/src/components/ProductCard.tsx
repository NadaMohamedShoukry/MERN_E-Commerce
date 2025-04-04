import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Props {
    _id:string;
    title:string;
    image:string;
    price:string;
}
export default function ProductCard({title,image,price}:Props) {
  return (
    <Card sx={{backgroundColor:"#C0B9A0"  ,width:"500px",  display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
      <CardMedia
        component="img"
        alt="device"
        height="400"
        image={image}
        // This ensures all images keep a 4:3 aspect ratio without setting a strict height (flexiable layout)
        // The aspectRatio property in MUI ensures that an element maintains a consistent width-to-height ratio, no matter its size.
        sx={{ aspectRatio: "4 / 5", width: "100%", objectFit: "cover" }}
      />
      <CardContent >
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {price} EGP
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{backgroundColor:"#B08463"}}
        variant='contained' size="small">Add to Cart</Button>
       
      </CardActions>
    </Card>
  );
}
