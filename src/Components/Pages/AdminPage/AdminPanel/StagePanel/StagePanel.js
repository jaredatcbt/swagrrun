import { Button, Grid, TextField, Card, CardContent } from "@mui/material";

import Swal from "sweetalert2";

import { useState, useContext, useRef, useEffect } from "react";

import { Web3Context } from "../../../../../Context/Web3Context";

import Web3 from "web3";

const StagePanel = (props) => {
  let web3Object = useContext(Web3Context);

  let isNotConnected = !Boolean(web3Object.isWallet);
  let processingState = web3Object.processingStatus;

  let getStageStatus = props.getStageStatusProp;

  let getStagePrice;
  if (props.getStagePriceProp) {
    getStagePrice = props.getStagePriceProp;
  }
  let updateStageLimitPerWallet = props.updateLimitPerWalletProp;
  let updateStageSupply = props.updateStageSupplyProp;
  let updateStagePrice = props.updateStagePriceProp;
  let toggleStage = props.toggleStage;

  let stageIdentifier = props.stageIdentifier;

  const [decimalPriceState, setdecimalPriceState] = useState("0.2");
  const [currentPriceState, setCurrentPriceState] = useState();

  const limitPerWalletRef = useRef("");
  const totalSupplyRef = useRef("");
  const stageOnePriceRef = useRef("");

  useEffect(async () => {
    if (!isNotConnected) {
      if (getStagePrice) {
        let currentPrice = await getStagePrice();
        setCurrentPriceState(Web3.utils.fromWei(String(currentPrice)));
      }
    }
  }, []);

  return (
    <Grid container>
      <Grid container item xs={12} md={6} my={3}>
        <Grid item xs={4} md={4} ml={{ xs: 8, md: 10 }}>
          <Button
            variant="contained"
            color="secondary"
            align="center"
            size="medium"
            onClick={() => {
              updateStageLimitPerWallet(limitPerWalletRef.current.value);
            }}
          >
            Update {stageIdentifier} NFT/Wallet
          </Button>
        </Grid>

        <Grid item xs={4} md={3} ml={{ xs: 2, md: 2 }}>
          <TextField
            id="outlined-basic"
            label="Limit Per Wallet"
            variant="outlined"
            type="number"
            inputRef={limitPerWalletRef}
          />
        </Grid>
      </Grid>

      <Grid container item xs={12} md={6} my={3}>
        <Grid item xs={4} md={4} ml={{ xs: 8, md: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            align="center"
            size="medium"
            onClick={() => {
              updateStageSupply(totalSupplyRef.current.value);
            }}
            disabled={!updateStageSupply}
          >
            Update {stageIdentifier} Total Supply
          </Button>
        </Grid>

        <Grid item xs={5} ml={{ xs: 2, md: 2 }}>
          <TextField
            id="outlined-basic"
            label="Stage One Total Supply"
            variant="outlined"
            type="number"
            inputRef={totalSupplyRef}
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
            disabled={stageIdentifier === "Premint"}
            onClick={async () => {
              await updateStagePrice(Number(stageOnePriceRef.current.value));
              let updatedPrice = await getStagePrice();
              let updatedPriceinEther = Web3.utils.fromWei(
                String(updatedPrice),
                "ether"
              );
              console.log(updatedPriceinEther, "updatedPriceinEther");
              setCurrentPriceState(updatedPriceinEther);
            }}
          >
            Update {stageIdentifier} Price
          </Button>
        </Grid>

        <Grid item xs={4} ml={{ xs: 2, md: 2 }}>
          <TextField
            id="outlined-basic"
            label="Stage One Price"
            variant="outlined"
            type="number"
            inputRef={stageOnePriceRef}
            value={decimalPriceState}
            onChange={(e) =>
              setdecimalPriceState(parseFloat(e.target.value).toFixed(3))
            }
            inputProps={{
              maxLength: 3,
              step: "0.01",
            }}
          />
        </Grid>
      </Grid>

      <Grid container item xs={12} md={5} my={3}>
        <Grid item xs={6} ml={{ xs: 8, md: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            align="center"
            size="large"
            // onClick={async () => {
            //   let price = await getStagePrice();
            //   Swal.fire(price);
            // }}
          >
            Refresh {stageIdentifier} Price
          </Button>
        </Grid>

        <Grid item xs={4} ml={{ xs: 0, md: 2 }}>
          <Card>
            <CardContent>
              {stageIdentifier} Price : {currentPriceState} Ether
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container item xs={12} my={3}>
        <Grid item xs={5} ml={{ xs: 8, md: 10 }}>
          <Button
            variant="contained"
            color="secondary"
            align="center"
            size="large"
            onClick={async () => {
              let status = String(await getStageStatus());
              Swal.fire(status);
            }}
          >
            Get {stageIdentifier} Status
          </Button>
        </Grid>

        <Grid item xs={4} ml={{ xs: 4, md: 5 }}>
          <Button
            variant="contained"
            color="secondary"
            align="center"
            size="large"
            onClick={toggleStage}
          >
            Toggle {stageIdentifier}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StagePanel;
