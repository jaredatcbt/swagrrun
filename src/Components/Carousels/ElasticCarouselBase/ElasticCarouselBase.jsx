import styled from "styled-components";
import Carousel from "react-elastic-carousel";

const StyledCarousel = styled(Carousel)`
  .rec-item-wrapper {
    height: 100%;
  }

  .rec.rec-arrow:disabled {
    visibility: hidden;
  }

  .rec.rec-arrow.rec.rec-arrow-right {
    background-color: none;
    color: #e60e61;
  }

  .rec.rec-arrow.rec.rec-arrow-right:hover {
    background-color: transparent;
    color: #f22;
  }

  .rec.rec-arrow.rec.rec-arrow-right:focus {
    background-color: transparent;
    color: #f22;
  }

  .rec.rec-arrow.rec.rec-arrow-left {
    background-color: none;
    color: #e60e61;
  }

  .rec.rec-arrow.rec.rec-arrow-left:hover {
    background-color: transparent;
    color: #f22;
  }

  .rec.rec-arrow.rec.rec-arrow-right:left {
    background-color: transparent;
    color: #f22;
  }

  .rec.rec-arrow.rec.rec-arrow-left:focus {
    background-color: transparent;
    color: #f22;
  }

  .rec.rec-dot.rec {
    background-color: #707070;
  }

  .rec.rec-dot.rec.rec-dot_active {
    background-color: #e60e61;
    box-shadow: none;
  }
`;

export default StyledCarousel;
