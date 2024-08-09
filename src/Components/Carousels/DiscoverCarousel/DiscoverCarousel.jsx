import { useState } from "react";
import ElasticCarouselBase from "../ElasticCarouselBase/ElasticCarouselBase";

import rightPanelImg from "../../../Resources/Entities/robo.png";

const DiscoverCarousel = () => {
  const [slidesState, setSlidesState] = useState([
    { id: 1, imgSrc: rightPanelImg },
    { id: 2, imgSrc: rightPanelImg },
    { id: 3, imgSrc: rightPanelImg },
    { id: 5, imgSrc: rightPanelImg },
  ]);

  return (
    <ElasticCarouselBase>
      {slidesState.map((item) => (
        <img style={{ width: "100%" }} src={item.imgSrc} />
      ))}
    </ElasticCarouselBase>
  );
};

export default DiscoverCarousel;
