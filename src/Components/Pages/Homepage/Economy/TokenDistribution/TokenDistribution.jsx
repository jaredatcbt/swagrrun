import tokenStatsImg from "../../../../../Resources/Other/tokenStats.png";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import styled from "styled-components";

// const StyledFlashyText = styled(Typography)`
//   color: rgba(240, 86, 210, 1);
//   animation: blinker 1.5s linear infinite;

//   @keyframes blinker {
//     50% {
//       color: rgba(200, 46, 170, 0.6);
//     }
//   }
// `;

// const StyledLink = styled(Link)`
//   color: #ffffff;
//   :hover {
//     color: #e60e61;
//   }
// `;

const TokenDistribution = (props) => {
  return (
    <Box py={6} sx={{ borderTop: "1px solid gray" }}>
      {/* <StyledFlashyText variant="h4">Renounced Wallets</StyledFlashyText>
      <StyledLink href="https://www.pinksale.finance/pinklock/record/1013253?chain=BSC">
        Team wallet
      </StyledLink>
      <br />
      <StyledLink href="https://www.pinksale.finance/pinklock/record/1013238?chain=BSC">
        Development wallet{" "}
      </StyledLink>
      <br />
      <StyledLink href="https://www.pinksale.finance/pinklock/record/1013237?chain=BSC">
        Eco System wallet{" "}
      </StyledLink>
      <br />
      <StyledLink href="https://www.pinksale.finance/pinklock/record/1013234?chain=BSC">
        P2E wallet wallet
      </StyledLink>
      <br /> */}
      <img width="90%" src={tokenStatsImg} alt="Token Distribution" />
    </Box>
  );
};

export default TokenDistribution;
