import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import styled from "styled-components";
import MintSection from "./MintSection/MintSection";

const StyledPrizeText = styled(Typography)`
  padding: 10px;

  margin-left: auto;
  margin-right: auto;

  color: #fff;
  text-align: center;
  animation: glow 1s ease-in-out infinite alternate;

  @keyframes glow {
    from {
      text-shadow: 0 0 10px #fff, 0 0 20px #e60073, 0 0 30px #e60073,
        0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
    }
    to {
      text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6,
        0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
    }
  }
`;

const StyledFlashyText = styled(Typography)`
  color: rgba(240, 86, 210, 1);
  animation: blinker 1.2s linear infinite;

  @keyframes blinker {
    50% {
      color: rgba(240, 66, 190, 0.3);
    }
  }
`;

const Mint = (props) => {
  return (
    <Box
      mt={2}
      py={5}
      textAlign="center"
      sx={{ boxShadow: "0 5px 20px rgba(240, 46, 170, 0.7);" }}
    >
      <StyledFlashyText variant="h4" mb={4}>
        {"12 WORDS & 1 ULTIMATE PRIZE"}
      </StyledFlashyText>

      <Container sx={{ width: "60%" }}>
        <Typography variant="body1" mb={3}>
          Part of our NFT's have a riddle coded into them <br />
          <br />
          Solve the riddle and you will have a word from the SEED PHRASE of the
          minting wallet! <br />
        </Typography>
      </Container>

      <MintSection />
      <Container sx={{ width: "60%" }}>
        <Box>
          <Typography variant="body1" mb={3}>
            Mint Price
            <Typography color="#39FF14">0.02 BNB</Typography>
          </Typography>
        </Box>
        <Typography variant="subtitle">
          The initial Treasure Hunting Prize Pool is
          <StyledPrizeText variant="h5">
            <a
              href="https://bscscan.com/address/0x8c31c2c5f8dd470237e2c3bf48fa56699612bf50"
              style={{ color: "white" }}
              rel="_noopener"
              target="_blank"
            >
              10,000 BUSD
            </a>
          </StyledPrizeText>
          The more Players will mint, the bigger it will grow!
        </Typography>
      </Container>

      {/* 
      <Typography color="#39FF14" variant="h6">
        SWC token launch phase - Avatar NFT minting price 0.25 BNB
      </Typography>

      <Typography color="#AAAFB4">
        Game release phase - Avatar NFT minting price 0.5 BNB
      </Typography>

      <Typography mt={2}>
        You can sell it at anytime on{" "}
        <Link
          target="_blank"
          rel="noopener"
          color="secondary"
          href="https://tofunft.com/collection/swagrun-nft/items"
        >
          Tofunft
        </Link>{" "}
        or our Marketplace
      </Typography> */}
    </Box>
  );
};

export default Mint;
