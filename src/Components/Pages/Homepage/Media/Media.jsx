import { Grid, Container, Typography, Link } from "@mui/material";

import benzinga from "../../../../Resources/Icons/Media/benzinga.png";
import coinpress from "../../../../Resources/Icons/Media/coinpress.png";
import newswire from "../../../../Resources/Icons/Media/newswire.png";
import yahoo from "../../../../Resources/Icons/Media/yahoo.png";
import ynews from "../../../../Resources/Icons/Media/ynews.png";
import nftcable from "../../../../Resources/Icons/Media/nftcable.png";

const Media = (props) => {
  return (
    <Container maxWidth="lg" sx={{ backgroundColor: "#101728" }}>
      <Typography variant="h4" textAlign="center" sx={{ mt: 10, pt: 4, pb: 2 }}>
        Media
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={6} md={4} textAlign="center">
          <Link
            target="_blank"
            rel="noopener"
            href="https://www.benzinga.com/amp/content/27358246"
          >
            <img src={benzinga} width="70%" />
          </Link>
        </Grid>

        <Grid item xs={6} md={4} textAlign="center">
          <Link
            target="_blank"
            rel="noopener"
            href="https://coinpress.media/swagrun-how-to-earn-big-on-this-play-to-earn-2d-nft-game/"
          >
            <img src={coinpress} width="70%" />
          </Link>
        </Grid>

        <Grid item xs={6} md={4} textAlign="center">
          <Link
            target="_blank"
            rel="noopener"
            href="https://www.globenewswire.com/news-release/2022/05/23/2448777/0/en/SWAGRUN-HOW-TO-EARN-BIG-ON-THIS-PLAY-TO-EARN-2D-NFT-GAME.html"
          >
            <img src={newswire} width="70%" />
          </Link>
        </Grid>

        <Grid item xs={6} md={4} textAlign="center">
          <Link
            target="_blank"
            rel="noopener"
            href="https://nftcable.io/news/swagrun-how-to-earn-big-on-this-play-to-earn-2d-nft-game/"
          >
            <img src={nftcable} width="80%" />
          </Link>
        </Grid>

        <Grid item xs={6} md={4} textAlign="center">
          <Link
            target="_blank"
            rel="noopener"
            href="https://finance.yahoo.com/news/swagrun-earn-big-play-earn-202200939.html?fr=sycsrp_catchall"
          >
            <img src={yahoo} width="80%" />
          </Link>
        </Grid>

        <Grid item xs={6} md={4} textAlign="center">
          <Link
            target="_blank"
            rel="noopener"
            href="https://www.yahoo.com/news/swagrun-earn-big-play-earn-202200939.html?fr=sycsrp_catchall"
          >
            <img src={ynews} width="80%" />
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Media;
