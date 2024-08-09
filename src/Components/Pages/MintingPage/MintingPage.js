import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import MintSection from "./MintSection/MintSection";

const MintingPage = (props) => {
  return (
      <Box mt={2} textAlign="center">
        <Typography>Minting Page</Typography>
        <MintSection/>
      </Box>
  );
};

export default MintingPage;
