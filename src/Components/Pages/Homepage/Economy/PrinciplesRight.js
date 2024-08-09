import { useState } from "react";
import { Typography, Box } from "@mui/material";
import styled from "styled-components";
import rect from "../../../../Resources/UI/rect.png";

const StyledList = styled.ul`
  list-style:none;
`;

const PrinciplesRight = (props) => {
  const points = props.pointsProp;
  const heading = props.headingProp;

  return (
    <Box maxWidth="80%" mt={5}>
      <Typography variant="h6" color="#e60e61" ml={2}>
        {heading}
      </Typography>
      <StyledList>
        {points
          ? points.map((item, index) => (
              <li style={{ fontSize: "1.25rem",marginTop: "3%" }} key={index} >
                {item}
              </li>
            ))
          : ""}
      </StyledList>
    </Box>
  );
};

export default PrinciplesRight;
