import { useState } from "react";
import { Typography, Box } from "@mui/material";
import styled from "styled-components";
import rect from "../../../../../Resources/UI/rect.png";

const StyledList = styled.ul`
  list-style-image: url(${rect});
`;

const SwagNumbersCard = (props) => {
  const listItems = props.listArr;
  const percent = props.percent;
  const title = props.title;
  const indexProp = props.indexProp;
  const bgOpacity =
    indexProp % 3 === 0 ? "1" : indexProp % 3 === 1 ? "0.6" : "0.3";
  const percentHeight =
    indexProp % 3 === 0 ? "2rem" : indexProp % 3 === 1 ? "1.6rem" : "1.4rem";
  const centerFromTop =
    indexProp % 3 === 0 ? "0" : indexProp % 3 === 1 ? "0.2rem" : "0.3rem";

  return (
    <Box>
      <Typography>{title}</Typography>
      <Box
        sx={{
          backgroundColor: "#E60E61",
          opacity: bgOpacity,
          height: percentHeight,
          width: "100%",
          top: centerFromTop,
          position: "relative",
          display: "flex",
          alignItems: "center"
        }}
      >
        <p> {percent}% </p>
      </Box>
      <StyledList>
        {listItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </StyledList>
    </Box>
  );
};

export default SwagNumbersCard;
