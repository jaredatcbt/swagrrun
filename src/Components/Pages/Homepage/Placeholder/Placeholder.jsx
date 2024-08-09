import { Container, Typography } from "@mui/material";
import placeholder1 from "../../../../Resources/Other/placeholder1.png";

const Placeholder = () => {
  return (
    <Container sx={{ maxWidth: { xs: "xs", md: "md" } }}>
      <Typography variant="h6" textAlign="center">
        Placeholder
      </Typography>
      <img src={placeholder1} width="100%" />
    </Container>
  );
};

export default Placeholder;
