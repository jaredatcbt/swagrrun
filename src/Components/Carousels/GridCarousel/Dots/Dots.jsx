import { Box } from "@mui/material";

const Dots = (props) => {
  const length = props.length;
  let index = props.index;

  let DotsArray = [];

  for (let i = 0; i < length; i++) {
    let bgColor = "#460015";
    if (index === i) bgColor = "#e60e61";
    DotsArray.push(
      <Box
        sx={{
          display: { xs: "initial", sm: "initial" },
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: bgColor,
          marginRight: "5px",
        }}
      />
    );
  }

  return DotsArray.map((item) => item);
};

export default Dots;
