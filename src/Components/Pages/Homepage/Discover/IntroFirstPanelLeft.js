import { Typography, Button, Box, Grid } from "@mui/material";
import Links from "../../../../Resources/Links/Links.json";
import { useTheme } from "@mui/material";

const IntroFirstPanelLeft = (props) => {
  const theme = useTheme();
  return (
    <Box mx={4}>
      <Typography textAlign={{ xs: "center", md: "left" }}>
        {props.heading1}
      </Typography>
      <Typography pt={2} variant="h3" textAlign={{ xs: "center", md: "left" }}>
        {props.heading2}
      </Typography>

      <Box sx={{ maxWidth: "90%" }}>
        <Typography pt={2}>{props.paragraph1}</Typography>

        <Typography mb={4}>{props.paragraph2}</Typography>

        <Grid container alignItems="center">
          <Grid item md={6} xs={12} textAlign="center" mt={4}>
            <Button
              variant="contained"
              href="https://poocoin.app/tokens/0xb1744f4e11a3dab936edcf9aa191dc7957a41892"
              target="_blank"
              rel="noopener"
              sx={{
                px: "32px",
                py: "12px",
                transition: "all 0.3s ease 0s",
                backgroundColor: "#E60E61",
                color: "#F1F1F1",

                "&:hover": {
                  color: "#F1F1F1",
                  // transform: "translateY(-7px)",
                  px: "40px",
                  py: "20px",
                  backgroundColor: "#E60E61",
                  boxShadow: " #F63E81 0px 0px 6px 8px",
                },
              }}
            >
              Buy Coins
            </Button>
          </Grid>

          {/* </LinkIconTemplate> */}

          <Grid item md={6} xs={12} textAlign="center" mt={4}>
            <Button
              color="white"
              size="large"
              variant="outlined"
              onClick={() =>
                window.open(
                  "https://tofunft.com/collection/swagrun-nft/items",
                  "_blank"
                )
              }
            >
              Explore NFTs
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default IntroFirstPanelLeft;
