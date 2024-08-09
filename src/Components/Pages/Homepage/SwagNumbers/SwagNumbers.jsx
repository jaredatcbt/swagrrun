import { Container, Typography, Grid } from "@mui/material";
import { useState } from "react";

import SwagNumbersCard from "./SwagNumbersCard/SwagNumbersCard";

const swagNumberOne = [
  "Presale",
  "09",
  [
    "Private presale of 16,200,000 SWAG tokens",
    "4% of the total supply",
    "Tokens will be released in 3 steps",
  ],
];

const swagNumbertwo = [
  "Play to Earn",
  "30",
  [
    "121,500,000 SWAG tokens",
    "30% of the total supply is allocated for staking",
  ],
];

const SwagNumbers = () => {
  let [swagNumberState, setSwagNumberState] = useState([
    swagNumberOne,
    swagNumberOne,
    swagNumbertwo,
    swagNumberOne,
    swagNumbertwo,
    swagNumberOne,
  ]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h6">SWAG Numbers Breakdown</Typography>
      <Typography color="#848484" mt={2} maxWidth="70%">
        Our goal is the longevity and prosperity of the game. The game should
        never get boring, nor it should run out of rewards.
      </Typography>
      <Grid container>
        {swagNumberState.map((numberItem, index) => (
          <Grid key={index} item xs={12} md={4}>
            <SwagNumbersCard indexProp={index} title={numberItem[0]} percent={numberItem[1]} listArr={numberItem[2]} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SwagNumbers;
