import {
  Button,
  Modal,
  Typography,
  Box,
  CircularProgress,
  TextField,
  Grid,
} from "@mui/material";

import { useContext, useEffect, useRef, useState } from "react";

import { Web3Context } from "../../../../Context/Web3Context";

const StakingSection = (props) => {
  const [DepositInfoState, setDepositInfoState] = useState();

  const web3Object = useContext(Web3Context);
  let userAccount = web3Object.accountAddress;
  let isConnected = Boolean(web3Object.isWallet);
  let processingStatus = web3Object.processingStatus;

  let areContractsSetUp = web3Object.areContractsSetUp;

  const contractInteractionHandler = web3Object.contractInteractionHandler;
  const getDepositInfo = web3Object.getDepositInfo;
  const redeem = web3Object.redeem;
  const stake = web3Object.stake;
  const stakeAmountRef = useRef(0);

  useEffect(async () => {
    if (areContractsSetUp) {
      console.log({ areContractsSetUp });
      let depositInfo = await getDepositInfo(userAccount);

      depositInfo = {
        rewards: depositInfo._rewards,
        stake: depositInfo._stake,
      };

      setDepositInfoState(depositInfo);
    }
  }, [areContractsSetUp]);

  return (
    <div>
      <Grid container my={3}>
        <Grid container item xs={12} mb={4} ml={{ xs: 0, sm: 2, md: 0 }}>
          <Grid item xs={6} sm={4}>
            <Typography>{`Currently Staked: ${
              DepositInfoState ? DepositInfoState.stake : "N/A"
            }`}</Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography>{`Accumulated Rewards : ${
              DepositInfoState ? DepositInfoState.rewards : "N/A"
            }`}</Typography>
          </Grid>
        </Grid>

        <Grid container item xs={12} mb={4} ml={{ xs: 0, sm: 2, md: 0 }}>
          <Grid item xs={5} sm={3}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ py: 2, alignItems: "center" }}
              onClick={() =>
                contractInteractionHandler(window.event, stake, {
                  stake: stakeAmountRef.current.value,
                })
              }
              disabled={!isConnected}
            >
              Stake
            </Button>
          </Grid>

          <Grid item xs={6} sm={3}>
            <TextField
              id="outlined-basic"
              label="Stake / Coins"
              variant="outlined"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              inputRef={stakeAmountRef}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} mb={4} ml={{ xs: 0, sm: 2, md: 0 }}>
          <Grid item xs={5} sm={3} ml={1}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ py: 2, alignItems: "center" }}
              onClick={async () => {
                contractInteractionHandler(window.event, redeem)
              }}
              disabled={!isConnected}
            >
              Redeem
            </Button>
          </Grid>
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
              Processing
            </Typography>
            <hr />
            <CircularProgress />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default StakingSection;
