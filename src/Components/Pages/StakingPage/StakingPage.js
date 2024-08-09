import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import StakingSection from "./StakingSection/StakingSection";

const StakingPage = (props) => {
  return (
    <Box
      mt={2}
      py={5}
      textAlign="center"
      sx={{ boxShadow: "0 5px 20px rgba(240, 46, 170, 0.7);" }}
    >
      <Typography variant="h4" mb={4}>
        Stake Your Swagrun Coins
      </Typography>
      
      <StakingSection />
    </Box>
  );
};

export default StakingPage;