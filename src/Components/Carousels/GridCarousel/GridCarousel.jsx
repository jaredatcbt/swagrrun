import img1 from "../../../Resources/Entities/GridCarousel/1.png";
import img2 from "../../../Resources/Entities/GridCarousel/2.png";
import img3 from "../../../Resources/Entities/GridCarousel/3.png";
import img4 from "../../../Resources/Entities/GridCarousel/4.png";
import img5 from "../../../Resources/Entities/GridCarousel/5.png";
import img6 from "../../../Resources/Entities/GridCarousel/6.png";
import Caro from "react-elastic-carousel";
import { Typography } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

import React, { useContext } from "react";
import Carousel from "react-grid-carousel";

import { Web3Context } from "../../../Context/Web3Context";

import useFetch from "../../../Services/Apihook";
import { imageurl } from "../../../Services/urls";

const GridCarousel = (props) => {
  const theme = useTheme();
  let isScreenAboveAwMedium = useMediaQuery(theme.breakpoints.up("awMd"));
  let isScreenBelowAw500 = useMediaQuery(theme.breakpoints.down("aw500"));

  let imgArray = [
    [img1, "Robo Swag"],
    [img2, "Skull Face Swag"],
    [img3, "Aqua Swag"],
    [img4, "Mr. Simple Swag"],
    [img5, "Ice Cream Swag"],
    [img6, "Grandpa Swag "],
  ];


  let web3Properties = useContext(Web3Context);
  let isMobile = web3Properties.isMobile;
  let imgWidth = "50%";
  if (isMobile) {
    imgWidth = "60%";
  }

  
  return (
    <>
      {isScreenAboveAwMedium ? (
        <Carousel cols={3} rows={2} gap={0} loop hideArrow={false}>
          {imgArray.map((item, index) => (
            <Carousel.Item key={JSON.stringify(item) + index}>
              <img
                width={imgWidth}
                src={item[0]}
                style={{ display: "block", margin: "auto" }}
              />
              <Typography textAlign="center" mb={5}>
                {item[1]}
              </Typography>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <Caro itemsToShow={isScreenBelowAw500 ? 1 : 2}>
          {imgArray.map((item, index) => (
            <>
              <img
                width={imgWidth}
                src={item[0]}
                style={{ display: "block", margin: "auto" }}
              />
            </>
          ))}
        </Caro>
      )}
    </>
  );
};

export default GridCarousel;
