import React from "react";

import { useMediaQuery, useTheme, Container } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import styled from "styled-components";

const PhaseOne = [
  "Phase 1",
  [
    "Q1 2022 Creation of SWAGrun Landing Website",
    "Q1 2022 SWAGrun Whitepaper",
    "Q1 2022 Creation of SWAGrun Social Media Platforms",
    "Q1 2022 Smart Contract Build",
    "Q2 2022 Presale round A",
    "Q2 2022 Presale round B",
  ],
];

const PhaseTwo = [
  "Phase 2",
  [
    "Q1 2022 Creation of SWAGrun Landing Website",
    "Q1 2022 SWAGrun Whitepaper",
    "Q1 2022 Creation of SWAGrun Social Media Platforms",
    "Q1 2022 Smart Contract Build",
    "Q2 2022 Presale round A",
    "Q2 2022 Presale round B",
  ],
];

const roadmapList = [
  PhaseOne,
  PhaseTwo,
  PhaseOne,
  PhaseOne,
  PhaseTwo,
  PhaseOne,
];

const initialState = {
  slideIndex: 0,
};

const slidesReducer = (state, event) => {
  if (event.type === "NEXT") {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % roadmapList.length,
    };
  }
  if (event.type === "PREV") {
    return {
      ...state,
      slideIndex:
        state.slideIndex === 0 ? roadmapList.length - 1 : state.slideIndex - 1,
    };
  }
};

///MODIFY THESE TO ADJUST SLIDES SIZES --> StyledSlideContentDiv -> width/height
const StyledSlideContentDiv = styled.div`
  width: ${(props) =>
    props.$issmall ? "50vw" : props.$ismed ? "35vw" : "16vw"};
  height: ${(props) =>
    props.$issmall ? "45vh" : props.$ismed ? "40vh" : "30vh"};
  position: relative;
  //Position center slide content with top
  top: ${(props) => (props.$issmall ? "25%" : props.$ismed ? "15%" : "15%")};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  transition: transform 0.5s ease-in-out;
  opacity: 0.6;
  z-index: -10;
  display: grid;
  align-content: center;

  transform-style: preserve-3d;
  transform: perspective(1000px) translateX(calc(100% * var(--offset)))
    rotateY(calc(-45deg * var(--dir)));
`;

// const StyledSlideBackgroundDiv = styled.div`
//   position: absolute;
//   top: 0;
//   left: -10%;
//   right: -10%;
//   bottom: 0;
//   //Adjust to modify background object width/height
//   background-size: ${(props) =>
//   props.$issmall ? "100% 60%" : props.$ismed ? "60% 100%" : "30% 90%"};
//   background-position: center center;
//   background-repeat: no-repeat;
//   z-index: -1;
//   opacity: 0;
//   transition: opacity 0.3s linear, transform 0.3s ease-in-out;
//   pointer-events: none;
//   /* max-height: 400px; */
//   /* max-width  : 800px; */
//   transform: translateX(calc(10% * var(--dir)));
// `;

function Slide(props) {
  let offset = props.offset;
  let slide = props.slide;

  const active = offset === 0 ? true : null;

  const theme = useTheme();
  let screenIsSmall = useMediaQuery(theme.breakpoints.down("sm"));
  let screenIsMedium = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div
      className="slide"
      data-active={active}
      style={{
        "--offset": offset,
        "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1,
      }}
    >
      <StyledSlideContentDiv
        className="slideContent"
        $issmall={screenIsSmall}
        $ismed={screenIsMedium}
      >
        HELLO
      </StyledSlideContentDiv>
    </div>
  );
}

//Modify this to adjust overall size
const StyledCarouselDiv = styled.div`
  overflow: hidden;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 3vh;
  display: grid;
  > .slide {
    grid-area: 1 / -1;
    //Modify this to adjust background size
    height: ${(props) =>
      props.$issmall ? "80vh" : props.$ismed ? "50vh" : "50vh"};
  }

  > button {
    appearance: none;
    background: transparent;
    border: none;
    position: absolute;
    font-size: 4rem;
    width: 5rem;
    height: 5rem;
    top: ${(props) => (props.$issmall ? "45%" : props.$ismed ? "55%" : "30%")};
    transition: opacity 0.3s;
    opacity: 0.7;
    z-index: 5;
    color: white;

    &:hover {
      opacity: 1;
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }
    &:first-child {
      left: ${(props) =>
        props.$issmall ? "80%" : props.$ismed ? "88%" : "93%"};
    }
    &:last-child {
      right: ${(props) =>
        props.$issmall ? "80%" : props.$ismed ? "88%" : "93%"};
    }
  }
  .slide[data-active] {
    z-index: 2;
    pointer-events: auto;
    background-color: rgba(0, 0, 0, 0.1);

    .slideBackground {
      opacity: 0.1;
      transform: none;
    }

    .slideContent {
      --x: calc(var(--px) - 0.5);
      --y: calc(var(--py) - 0.5);
      opacity: 1;

      transform: perspective(1000px);

      &:hover {
        transition: none;
        transform: perspective(1000px) rotateY(calc(var(--x) * 45deg))
          rotateX(calc(var(--y) * -45deg));
      }
    }
  }
`;

function ImageCarousel() {
  const [state, dispatch] = React.useReducer(slidesReducer, initialState);

  let [roadmapState, setRoadmapState] = React.useState([
    PhaseOne,
    PhaseTwo,
    PhaseOne,
    PhaseOne,
    PhaseTwo,
    PhaseOne,
  ]);

  const theme = useTheme();

  let screenIsSmall = useMediaQuery(theme.breakpoints.down("sm"));
  let screenIsMedium = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container maxWidth="xl">
      <StyledCarouselDiv $issmall={screenIsSmall} $ismed={screenIsMedium}>
        <button
          onClick={() => dispatch({ type: "PREV" })}
          issmall={screenIsSmall ? 1 : 0}
        >
          {" "}
          <ArrowForwardIcon fontSize="" />{" "}
        </button>

        {[...roadmapState, ...roadmapState, ...roadmapState].map((slide, i) => {
          let offset = roadmapState.length + (state.slideIndex - i);
          return (
            <Slide
              slide={slide}
              offset={offset}
              key={i}
              $issmall={screenIsSmall}
              $ismed={screenIsMedium}
              
            />
          );
        })}
        <button
          onClick={() => dispatch({ type: "NEXT" })}
          issmall={screenIsSmall ? 1 : 0}
        >
          {" "}
          <ArrowBackIcon fontSize="" />{" "}
        </button>
      </StyledCarouselDiv>
    </Container>
  );
}

export default ImageCarousel;
