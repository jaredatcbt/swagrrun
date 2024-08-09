import { Typography, Container, Box } from "@mui/material";
import useFetch from "../../../../Services/Apihook";

const TextArea = () => {
  const { loading, Content } = useFetch("section-2-text-areas?populate=*");

  return loading ? (
    ""
  ) : (
    <Container sx={{ mt: 10 }}>
      <Typography textAlign="center" color="#E60E61">
        {Content[0].attributes.heading1}
      </Typography>

      <Box sx={{ maxWidth: "80%", margin: "auto" }}>
        <Typography textAlign="center" color="#848484" mt={2}>
          {Content[0].attributes.paragraph1}
        </Typography>
        <Typography textAlign="center" variant="h5" color="#E60E61" my={4}>
          Meet Our Swagstars
        </Typography>
      </Box>
    </Container>
  );
};

export default TextArea;
