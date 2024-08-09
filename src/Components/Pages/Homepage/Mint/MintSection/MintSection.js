import {
  Button,
  Modal,
  Typography,
  Box,
  CircularProgress,
  TextField,
  Grid,
} from "@mui/material";

import { useContext, useRef } from "react";

import { Web3Context } from "../../../../../Context/Web3Context";

const MintSection = (props) => {
  const web3Object = useContext(Web3Context);

  const mintBatchSizeRef = useRef("");

  const onMintHandler = web3Object.onMintHandler;
  const sendBatchPremint = web3Object.batchPreMint;
  const sendBatchPublicMint = web3Object.batchPublicMint;

  let processingStatus = web3Object.processingStatus;

  let getIsWhiteListedData = web3Object.getIsWhiteListedData;

  let isConnected = Boolean(web3Object.isWallet);

  const whiteListMintHandler = async () => {
    let mintToUse = () => {};
    let response = await getIsWhiteListedData();
    console.log(response, "response");
    let isWhiteListedData = response.data;
    if (isWhiteListedData.isVerified) {
      console.log(isWhiteListedData.isVerified, "isVerified");
      mintToUse = sendBatchPremint;
    } else mintToUse = sendBatchPublicMint;
    console.log(isWhiteListedData, "isWhiteListedData");
    onMintHandler(
      window.event,
      mintToUse,
    {isWhiteListedData},
      mintBatchSizeRef.current.value
    );

    return mintToUse;
  };

  return (
    <div>
      <Grid container item xs={12} md={12} my={3} textAlign="center">
        <Grid item xs={4} md={4} ml={{ xs: 2, md: 12 }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ py: 2, alignItems:"center" }}
            onClick={() => {
              console.log(
                mintBatchSizeRef.current.value,
                "mintBatchSizeRef.current.value"
              );
              whiteListMintHandler();
            }}
            disabled={!isConnected}
          >
            Mint
          </Button>
        </Grid>

        <Grid item xs={5} ml={{ xs: 2, md: 1 }}>
          <TextField
            id="outlined-basic"
            label="Mint Batch Size"
            variant="outlined"
            type="number"
            InputProps={{ inputProps: { min: 1, max: 100 } }}
            inputRef={mintBatchSizeRef}
            fullWidth
          />
        </Grid>
      </Grid>

      <Modal open={processingStatus}>
        <Box
          minHeight="100vh"
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
        >
          <div align="center">
            <Typography variant="h3" align="center">
              Minting
            </Typography>
            <hr />
            <CircularProgress />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MintSection;
