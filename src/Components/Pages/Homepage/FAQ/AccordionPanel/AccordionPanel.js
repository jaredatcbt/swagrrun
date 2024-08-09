import { useState } from "react";
import Accordion from "@mui/material/Accordion";

import { AccordionSummary, AccordionDetails } from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { Typography } from "@mui/material";

const AccordionPanel = (props) => {
  const [expandedState, setExpandedState] = useState(false);

  const handleAccordionToggle = () => {
    setExpandedState((prev) => {
      return !expandedState;
    });
  };

  return (
    <Accordion disableGutters onChange={() => handleAccordionToggle()}>
      <AccordionSummary
        expandIcon={
          expandedState ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
        }
      >
        <Typography variant="h6" component="p">
          {props.question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ marginTop: "3vh" }}>
        <Typography>{props.answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionPanel;
