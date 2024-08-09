import AdditionalItem from "./AdditionalItem/AdditionalItem";

import backgroundMask from "../../../../Resources/Background/bg.png";

import { Box, Typography, Grid, Container } from "@mui/material";
import useFetch from "../../../../Services/Apihook";

const Additional = () => {
  const { loading, Content } = useFetch("s4-additionals?populate=*");

  const heading = Content[0]?.attributes.heading1;
  const paragraph = Content[0]?.attributes.paragraph1;
  const BoxHeading1 = Content[0]?.attributes.BoxHeading1;
  const BoxHeading2 = Content[0]?.attributes.BoxHeading2;
  const BoxHeading3 = Content[0]?.attributes.BoxHeading3;
  const BoxParagraph1 = Content[0]?.attributes.BoxParagraph1;
  const BoxParagraph2 = Content[0]?.attributes.BoxParagraph2;
  const BoxParagraph3 = Content[0]?.attributes.BoxParagraph3;

  let AdditionalItemArr = [
    [BoxHeading1, BoxParagraph1],
    [BoxHeading2, BoxParagraph2],
    [BoxHeading3, BoxParagraph3],
  ];

  return loading ? (
    ""
  ) : (
    <Box  py={10}>
      <Container maxWidth="lg">
        <Typography variant="h6" mb={5} color="#E60E61" ml={4} textAlign="center">
          {heading}
        </Typography>

        {/* <Typography mb={2} ml={4} color="#848484">
          {paragraph}
        </Typography> */}

        <Grid container>
          {AdditionalItemArr.map((item) => (
            <AdditionalItem title={item[0]} para={item[1]} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Additional;
