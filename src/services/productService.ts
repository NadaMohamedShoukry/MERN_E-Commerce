import { productModel } from "../models/productModel";

export const getAllProducts = async () => {
  //find()=> gets all products from database.
  return await productModel.find();
};


//will be called before the app starts.
export const seedInitialProducts = async () => {
  const products = [
    {
      title: "Apple iPhone 14 Pro",
      image:
        "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-deep-purple-220907-geo_inline.jpg.large.jpg",
      price: 999.99,
      stock: 25,
    }, {
        title: "Samsung Galaxy S23 Ultra",
        image: "https://images-cdn.ubuy.co.in/65d21e48db90c47ae46550ef-pre-owned-samsung-galaxy-s23-ultra-5g.jpg",
        price: 1199.99,
        stock: 15,
      },
      {
        title: "Sony WH-1000XM5 Headphones",
        image: "https://www.adorama.com/images/Large/SOWH1XM5BAK.jpg",
        price: 399.99,
        stock: 40,
      },
      {
        title: "Dell XPS 15 Laptop",
        image: "https://m.media-amazon.com/images/I/811DyJu0SgL._AC_SL1500_.jpg",
        price: 1599.99,
        stock: 10,
      },
      {
        title: "PlayStation 5 Console",
        image: "https://f.nooncdn.com/p/v1669724765/N40633047A_1.jpg?format=jpg&width=original",
        price: 499.99,
        stock: 5,
      },
      {
        title: "Logitech MX Master 3S Mouse",
        image: "https://alfrensia.com/wp-content/smush-webp/2023/07/1-20.jpg.webp",
        price: 99.99,
        stock: 50,
      },
      {
        title: "Samsung 55-Inch QLED 4K Smart TV",
        image: "https://api-rayashop.freetls.fastly.net/media/catalog/product/cache/4e49ac3a70c0b98a165f3fa6633ffee1/r/y/ryshvuq_ovozfq7saumnic9e.jpeg?format=jpeg&width=368",
        price: 699.99,
        stock: 20,
      },
      {
        title: "Apple MacBook Air M2",
        image: "https://m.media-amazon.com/images/I/81Fm0tRFdHL.jpg",
        price: 1299.99,
        stock: 12,
      },
     
   
  ];

const existingProducts=await getAllProducts();
if(existingProducts.length === 0){
    await productModel.insertMany(products);
}
};
