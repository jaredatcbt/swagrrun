import { imageurl } from "../../../../Services/urls";

const IntroFirstPanelRight = (props) => {
  let rightImg = props.imgPath;
  return (
    <img width="100%" src={`${imageurl}${rightImg}`} alt="First Panel Pic" />
  );
};

export default IntroFirstPanelRight;
