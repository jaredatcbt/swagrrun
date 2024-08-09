import TokenDistribution from "./TokenDistribution/TokenDistribution";
// import useFetch from "../../../../Services/Apihook";
// import ImageLeft from "./ImageLeft";
// import PrinciplesRight from "./PrinciplesRight";

import { Grid, Box } from "@mui/material";

const Economy = (props) => {
  // const imageSX = {};

  // const { loading, Content } = useFetch("section-4-economies?populate=*");

  // const heading = Content[0]?.attributes?.heading1;
  // const leftImage = Content[0]?.attributes?.leftImage.data.attributes.url;
  // const point1 = Content[0]?.attributes?.point1;
  // const point2 = Content[0]?.attributes?.point2;
  // const point3 = Content[0]?.attributes?.point3;
  // const point4 = Content[0]?.attributes?.point4;
  // const point5 = Content[0]?.attributes?.point5;
  // const point6 = Content[0]?.attributes?.point6;
  // const point7 = Content[0]?.attributes?.point7;
  // const point8 = Content[0]?.attributes?.point8;
  // const point9 = Content[0]?.attributes?.point9;
  // const allPoints = [
  //   point1,
  //   point2,
  //   point3,
  //   point4,
  //   point5,
  //   point6,
  //   point7,
  //   point8,
  //   point9,
  // ];
  return (
    <div>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={16}>
        {/* <Grid item xs={16} md={6} alignItems="center">
          <ImageLeft leftImageProp={leftImage} />
        </Grid> */}

        {/* <Grid item xs={16} md={10} display="flex" alignItems="center">
          <PrinciplesRight pointsProp={allPoints} headingProp={heading}/>
        </Grid> */}
        <Grid item xs={16} align="center">
          <TokenDistribution />
        </Grid>
      </Grid>
    </div>
  );
};

export default Economy;
