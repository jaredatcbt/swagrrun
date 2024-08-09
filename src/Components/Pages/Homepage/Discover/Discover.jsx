import IntroFirstPanelLeft from "./IntroFirstPanelLeft";
import IntroFirstPanelRight from "./IntroFirstPanelRight";
import { Grid } from "@mui/material";
import useFetch from "../../../../Services/Apihook";

import backgroundMask from "../../../../Resources/Background/bg.png";

const imageSX = {
  backgroundImage: `url( ${backgroundMask})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  py: 5,
};

const Discover = () => {
  const { loading, Content } = useFetch("section-1-banners?populate=*");

  return loading ? (
    ""
  ) : (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      alignItems="center"
      sx={imageSX}
      columns={20}
    >
      <Grid item xs={20} md={12}>
        <IntroFirstPanelLeft
          heading1={Content[0].attributes.heading1}
          heading2={Content[0].attributes.heading2}
          paragraph1={Content[0].attributes.paragraph1}
          paragraph2={Content[0].attributes.paragraph2}
        />
      </Grid>

      <Grid item xs={20} md={8}>
        <IntroFirstPanelRight
          imgPath={Content[0].attributes.bannerImage.data.attributes.url}
        />
      </Grid>
    </Grid>
  );
};

export default Discover;
