import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

import TeamGrid from "./TeamGrid/TeamGrid";
import backgroundMask from "../../../../Resources/Background/bg.png";
const Teams = (props) => {
  return (
    <div style={{ backgroundImage: `url( ${backgroundMask})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    }}>
    <Container
    
      id="team"
      maxWidth="lg"
      sx={{ pt: 5, pb: 15, textAlign: "center"  ,borderTop: "1px solid gray" }}
    >
      <Typography variant="h5" sx={{ mb: 5 }}>
        Meet Our Team
      </Typography>
      <TeamGrid />
    </Container>
    </div>
  );
};

export default Teams;
