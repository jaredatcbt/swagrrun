import Discover from "./Discover/Discover";
import Mint from "./Mint/Mint";
import TextArea from "./TextArea/TextArea";
import GridCarousel from "../../Carousels/GridCarousel/GridCarousel";
// import SwagNumbers from "./SwagNumbers/SwagNumbers";
// import Roadmap from "./Roadmap/Roadmap";
import Economy from "./Economy/Economy";
// import Additional from "./Additional/Additional";
import Team from "./Team/Team";
// import Partners from "./Partners/Partners";
// import Media from "./Media/Media";

import { useParams, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Container } from "@mui/material";

const Homepage = () => {
  let param = useParams();

  const goToSection = () => {
    if (param.section) {
      let element = document.getElementById(param.section);
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      goToSection();
    }, 500);
  }, [param]);

  return (
    <main>
      <Container maxWidth={false} disableGutters>
        <Discover />
        <Mint />
        <TextArea />
        <GridCarousel />
        {/* <SwagNumbers /> */}
        {/* <Roadmap /> */}
        <Economy />
        {/* <Additional /> */}
        <Team />
        {/* <Partners /> */}
        {/* <Media /> */}
      </Container>
    </main>
  );
};

export default Homepage;
