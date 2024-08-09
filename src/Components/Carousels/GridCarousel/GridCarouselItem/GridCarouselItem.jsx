import Carousel from "react-grid-carousel";
import { Typography } from "@mui/material";

const GridCarouselItem = (props) => {
  return (
    <Carousel.Item>
      // <img width="100%" src={props.img} />
      <Typography textAlign="center">{"Robo"}</Typography>
      /*{" "}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0px 80px",
        }}
      >
        <Dots
          length={Content[0].attributes.imagesCarousel.data.length}
          index={index}
        />
      </div>{" "}
      */
    </Carousel.Item>
  );
};

export default GridCarouselItem;
