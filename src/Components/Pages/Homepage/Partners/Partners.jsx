import { Grid, Container, Typography } from "@mui/material";

import bnbSmart from "../../../../Resources/Icons/bnbSmart.png";
import certik from "../../../../Resources/Icons/certik.png";
import coinGecko from "../../../../Resources/Icons/coinGecko.png";
import coinMarketCap from "../../../../Resources/Icons/coinMarketCap.png";
import unity from "../../../../Resources/Icons/unity.png";

const Partners = (props) => {
  return (
    <Container maxWidth="lg" >
      <Typography variant="h4" textAlign="center" sx={{ pt: 4, pb:6 }}>
        Partners
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={6} md={4} textAlign="center">
          <img src={bnbSmart} width="60%" />
        </Grid>

        <Grid item xs={6} md={4} textAlign="center">
          <img src={certik} width="60%" />
        </Grid>

        <Grid item xs={6} md={4} textAlign="center">
          <img src={coinGecko} width="60%" />
        </Grid>

        <Grid item xs={2}></Grid>

        <Grid item xs={6} md={4} textAlign="center">
          <img src={coinMarketCap} width="90%" />
        </Grid>

        <Grid item xs={6} md={4} textAlign="center">
          <img src={unity} width="50%" />
        </Grid>

        <Grid item xs={2}></Grid>
      </Grid>
    </Container>
  );
};

export default Partners;
