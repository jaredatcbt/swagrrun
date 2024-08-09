import { Container } from "@mui/material";
import { imageurl } from "../../../../Services/urls";

const ImageLeft = (props) => {
  const leftImage = props.leftImageProp;

  return (
    <Container
      sx={{
        mt: "3%",
      }}
    >
      <img src={`${imageurl}${leftImage}`} style={{ width: "100%" }} />
    </Container>
  );
};

export default ImageLeft;
