import { useState } from "react";
import { Typography } from "@mui/material";

import AccordionPanel from "./AccordionPanel/AccordionPanel";
import Container from "@mui/material/Container";

const FAQ = (props) => {
  const [questionsState, setQuestionsState] = useState([
    "What is the Swag Run?",
    "What is the Swag Run?",
    "What is the Swag Run?",
  ]);

  const [answersState, setAnswersState] = useState([
    "The Swagrun is a collection of a wonderful group of things",
    "The Swagrun is a collection of a wonderful group of things",
    "The Swagrun is a collection of a wonderful group of things",
  ]);

  return (
    <Container id="FAQs" maxWidth="lg" sx={{ my: "5%" }}>
      <Typography variant="h2" component="h2" align="center" mb={10}>
        Frequently Asked Questions
      </Typography>

      {questionsState.map((item, index) => {
        return <AccordionPanel key={"AccPanel"+index} question={item} answer={answersState[index]} />;
      })}
    </Container>
  );
};

export default FAQ;
