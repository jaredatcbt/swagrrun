import { Box, Typography } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

import ElasticCarouselBase from "../../../Carousels/ElasticCarouselBase/ElasticCarouselBase";

import RoadmapItem from "./RoadmapItem/RoadmapItem";

import backgroundMask from "../../../../Resources/Background/bg.png";

import useFetch from "../../../../Services/Apihook";

const Roadmap = () => {
  const theme = useTheme();
  let medium = useMediaQuery(theme.breakpoints.down("md"));

  const { loading, Content } = useFetch("s3-headings?populate=*");

  // let [roadmapState, setRoadmapState] = useState([]);

  return loading ? "" : (
    <Box sx={{ backgroundImage: `url( ${backgroundMask})` }} pt={10}>
      <Typography variant="h6" textAlign="center" mb={8}>
        Roadmap
      </Typography>

      {medium ? (
        <ElasticCarouselBase itemsToShow={1}>
        {Content.map((item,index) => (
            <RoadmapItem title={item.attributes.BoxHeading} listArr={item.attributes.section_3_roadmap_box_points} />
          ))}
        </ElasticCarouselBase>
      ) : (
        <ElasticCarouselBase itemsToShow={3}>
          {Content.map((item,index) => (
            <RoadmapItem title={item.attributes.BoxHeading} listArr={item.attributes.section_3_roadmap_box_points} boxNumber={index+1}/>
          ))}
        </ElasticCarouselBase>
      )}
    </Box>
  );
};

export default Roadmap;
