import {
  Button,
  Grid,
  Box,
  TextField,
  Modal,
  CircularProgress,
  Typography,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Swal from "sweetalert2";

import { useState, useContext, useRef } from "react";

import { Web3Context } from "../../../../Context/Web3Context";

import StagePanel from "./StagePanel/StagePanel";
import WhitelistPanel from "./WhitelistPanel/WhitelistPanel";

const AdminPanel = (props) => {
  let web3 = useContext(Web3Context);

  let isNotConnected = !Boolean(web3.isWallet);

  let pause = web3.pause;
  let unpause = web3.unpause;

  const onMintHandler = web3.onMintHandler;
  let ownerMintByDna = web3.ownerMintByDna;
  let batchOwnerMint = web3.batchOwnerMint;

  const getTokenUriForId = web3.getTokenUriForId;
  const reveal = web3.reveal;
  const updateBaseUri = web3.updateBaseUri;

  const getPremintStatus = web3.getPremintStatus;
  const getPublicMintStatus = web3.getPublicMintStatus;

  const updatePremintStageLimitPerWallet =
    web3.updatePremintStageLimitPerWallet;
  const updatePublicMintStageLimitPerWallet =
    web3.updatePublicMintStageLimitPerWallet;

  const updatePremintStageTotalSupplyLimit =
    web3.updatePremintStageTotalSupplyLimit;

  const updatePremintStagePrice = web3.updatePremintStagePrice;
  const updatePublicMintStagePrice = web3.updatePublicMintStagePrice;

  const getPublicMintStagePrice = web3.getPublicMintStagePrice;

  const togglePremintStage = web3.togglePremintStage;
  const togglePublicMintStage = web3.togglePublicMintStage;

  const withdrawSevenTwoOneFunds = web3.withdrawSevenTwoOneFunds;

  let processingStatus = web3.processingStatus;

  const isRevealed = web3.isRevealed;
  const ownerMintDnaRef = useRef("");
  const tokenIdForUriRef = useRef("");
  const baseUriRef = useRef("");
  const ownerMintBatchRef = useRef("");
  const withdrawAddressRef = useRef("");
  const withdrawAmountRef = useRef("");

  const [tabValue, setTabValue] = useState("1");
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <Grid container>
        <Grid container item xs={12} md={6} my={3}>
          <Grid item xs={4} md={5} ml={{ xs: 8, md: 10 }}>
            <Button
              variant="contained"
              color="secondary"
              align="center"
              size="large"
              onClick={pause}
              disabled={isNotConnected}
            >
              pause
            </Button>
          </Grid>

          <Grid item xs={5} ml={{ xs: 2, md: 0 }}>
            <Button
              variant="contained"
              color="secondary"
              align="center"
              size="large"
              onClick={unpause}
              disabled={isNotConnected}
            >
              unpause
            </Button>
          </Grid>
        </Grid>

        <Grid container item xs={12} md={6} my={3}>
          <Grid item xs={4} md={5}>
            <Button
              variant="contained"
              color="secondary"
              align="center"
              size="large"
              onClick={reveal}
              disabled={isNotConnected}
            >
              Reveal
            </Button>
          </Grid>

          <Grid item xs={4} md={5}>
            <Button
              href="http://3.64.11.172:1337/admin"
              target="_blank"
              rel="noopener"
              disableRipple={true}
              variant="contained"
              color="secondary"
              size="large"
              disabled={isNotConnected}
            >
              Content
            </Button>
          </Grid>
        </Grid>

        <Grid container item xs={12} md={6} my={3}>
          <Grid item xs={4} md={4} ml={{ xs: 8, md: 10 }}>
            <Button
              variant="contained"
              color="secondary"
              align="center"
              size="large"
              onClick={() => {
                let dna = ownerMintDnaRef.current.value;
                onMintHandler(window.event, ownerMintByDna, { dna }, null);
              }}
              disabled={isNotConnected}
            >
              Owner Mint
            </Button>
          </Grid>

          <Grid item xs={5} ml={{ xs: 1, md: -1 }}>
            <TextField
              id="outlined-basic"
              label="Owner Mint DNA"
              variant="outlined"
              type="string"
              inputRef={ownerMintDnaRef}
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} my={3}>
          <Grid item xs={2} md={3} ml={{ xs: 8, md: 10 }}>
            <Button
              variant="contained"
              color="secondary"
              align="center"
              size="large"
              onClick={() => {
                onMintHandler(
                  window.event,
                  batchOwnerMint,
                  null,
                  ownerMintBatchRef.current.value
                );
              }}
              disabled={isNotConnected}
            >
              Batch Owner Mint
            </Button>
          </Grid>

          <Grid item xs={4} md={2} ml={{ xs: 10, md: -8 }}>
            <TextField
              id="outlined-basic"
              label="Owner Batch Size"
              variant="outlined"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 9999 } }}
              inputRef={ownerMintBatchRef}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} md={6} my={3}>
          <Grid item xs={4} ml={{ xs: 8, md: 10 }}>
            <Button
              variant="contained"
              color="secondary"
              align="center"
              size="large"
              onClick={async () =>
                Swal.fire(
                  await getTokenUriForId(tokenIdForUriRef.current.value)
                )
              }
              disabled={isNotConnected}
            >
              Get Uri for Token ID
            </Button>
          </Grid>

          <Grid item xs={4} ml={{ xs: 2, md: 5 }}>
            <TextField
              id="outlined-basic"
              label="Token ID to get Uri"
              variant="outlined"
              type="number"
              inputRef={tokenIdForUriRef}
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} md={6} my={3}>
          <Grid item xs={4} ml={{ xs: 8, md: 10 }}>
            <Button
              variant="contained"
              color="secondary"
              align="center"
              size="large"
              onClick={() => updateBaseUri(baseUriRef.current.value)}
              disabled={isNotConnected}
            >
              Update Base URI
            </Button>
          </Grid>

          <Grid item xs={4} ml={{ xs: 2, md: 1 }}>
            <TextField
              id="outlined-basic"
              label="New Base URI"
              variant="outlined"
              type="string"
              inputRef={baseUriRef}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} ml={{ xs: 8, md: 10 }} my={3}>
          <Button
            variant="contained"
            color="secondary"
            align="center"
            size="large"
            disabled={isNotConnected}
            onClick={async () => {
              let isRev = await isRevealed();
              Swal.fire(String(isRev));
            }}
          >
            Is revealed?
          </Button>
        </Grid>

        <Grid container item xs={12} my={3} ml={{ xs: 4, md: 10 }}>
          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              color="secondary"
              align="center"
              size="large"
              disabled={isNotConnected}
              onClick={() => {
                withdrawSevenTwoOneFunds(
                  withdrawAddressRef.current.value,
                  withdrawAmountRef.current.value
                );
              }}
            >
              Withdraw Funds
            </Button>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              id="outlined-basic"
              label="Withdraw Address"
              variant="outlined"
              type="string"
              inputRef={withdrawAddressRef}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              id="outlined-basic"
              label="Withdraw Amount"
              variant="outlined"
              type="string"
              inputRef={withdrawAmountRef}
            />
          </Grid>
        </Grid>
      </Grid>

      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            variant="scrollable"
            allowScrollButtonsMobile
            scrollButtons
            aria-label="Admin Panel"
          >
            <Tab label="Premint" value="1" />
            <Tab label="Public Mint" value="2" />
            <Tab label="Whitelists" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <StagePanel
            stageIdentifier={"Premint"}
            updateLimitPerWalletProp={updatePremintStageLimitPerWallet}
            updateStageSupplyProp={updatePremintStageTotalSupplyLimit}
            updateStagePriceProp={updatePremintStagePrice}
            getStageStatusProp={getPremintStatus}
            toggleStage={togglePremintStage}
          />
        </TabPanel>

        <TabPanel value="2">
          {" "}
          <StagePanel
            stageIdentifier={"Public"}
            updateLimitPerWalletProp={updatePublicMintStageLimitPerWallet}
            updateStagePriceProp={updatePublicMintStagePrice}
            getStageStatusProp={getPublicMintStatus}
            getStagePriceProp={getPublicMintStagePrice}
            toggleStage={togglePublicMintStage}
          />
        </TabPanel>

        <TabPanel value="3">
          <WhitelistPanel />
        </TabPanel>
      </TabContext>

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

export default AdminPanel;
