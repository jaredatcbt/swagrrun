import { Grid, Container, Typography } from "@mui/material";
import { useState } from "react";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

let imagesArray = importAll(
  require.context("../../../Resources/Shop", false, /\.(png|jpe?g|webp)$/)
);
imagesArray = Object.entries(imagesArray);
let productImages = [];
imagesArray.map((imgItem, index) => productImages.push(imgItem[1]));


const ShopPage = (props) => {
  let [productImagesState, setProductImagesState] = useState(productImages);


  return (
    <Container>
      <Typography variant="h2" align="center" my={5}>
        Shop
      </Typography>
      <Typography variant="h4" my={3}>
        Coming Soon
      </Typography>

      <Grid container spacing={2}>
        {productImagesState.map((item, index) => (
          <Grid item xs={12} sm={6} md={4}>
            <img src={item.default} style={{ width: "95%" }} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ShopPage;
