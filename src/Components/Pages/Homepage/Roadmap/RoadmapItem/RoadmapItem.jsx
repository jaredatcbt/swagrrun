import { Typography } from "@mui/material";

import rect from "../../../../../Resources/UI/rect.png";
import rectV from "../../../../../Resources/UI/rectV.png";
import styled from "styled-components";
import { useState, useEffect } from "react";

const StyledList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledRoadmapLine = styled.div`
  border-top: 1px;
  background-color: #ccc;
  height: 1px;
  width: 100%;
`;

const StyledLi = styled.li`
  display: flex;
  align-items: flex-start;

  padding-bottom: 8px;
  &:before {
    content: url(${rect});
    font-weight: 700;
    padding-right: 10px;
    padding-bottom: 2px;
  }
`;

const StyledTickItem = styled(StyledLi)`
  &:before {
    content: url(${rectV});
    font-weight: 900;
    padding-right: 10px;
    padding-bottom: 2px;
  }
`;

import { Box } from "@mui/material";

const RoadmapItem = (props) => {
  let title = props.title;
  let listItems = props.listArr;
  let boxNumber = props.boxNumber;
  const [tickedItemsState, setTickedItemsState] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (boxNumber) {
      if (boxNumber === 1) {
        setTickedItemsState([0, 1, 2, 3, 4]);
      }
      if (boxNumber === 2) {
        setTickedItemsState([1, 2, 3]);
      }
      if (boxNumber === 3) {
        setTickedItemsState([2]);
      }
      setLoad(true);
    }
  }, []);

  return (
    load && (
      <Box width="100%" height="100%">
        <Box display="flex" alignItems="center">
          <StyledRoadmapLine />
          <img src={rect} />
          <StyledRoadmapLine />
        </Box>

        <Box
          p={4}
          borderRadius="15%"
          boxShadow="0px 0px 25px 6px rgba(2255,255,255,0.75) inset;"
          border="2px solid white"
          mt={2}
          width="90%"
          height="90%"
        >
          <Typography variant="body1" color="#E60E61" textAlign="center" mb={1}>
            {title}
          </Typography>

          <StyledList>
            {listItems.data.map((item, index) => {
              if (tickedItemsState.indexOf(index) !== -1) {
                return (
                  <StyledTickItem style={{ fontSize: "0.875rem" }} key={index}>
                    {item.attributes.point}
                  </StyledTickItem>
                );
              } else {
                return (
                  <StyledLi style={{ fontSize: "0.875rem" }} key={index}>
                    {item.attributes.point}
                  </StyledLi>
                );
              }
            })}
          </StyledList>
        </Box>
      </Box>
    )
  );
};

export default RoadmapItem;
