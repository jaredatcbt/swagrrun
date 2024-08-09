import { Button, Grid,TextField } from "@mui/material";

import Swal from "sweetalert2";

import { useState, useContext, useRef } from "react";

import { BlockChainContext } from "../../../../../Context/newNftContext";

import { Login } from "../../../../../Context/OnboardContext";
import { getAccount } from "../../../../../Context/OnboardContext";
import { getIsPremintStageActiveFunc } from "../../../../../Context/OnboardContext";

import {sendBatchPremintFunc} from "../../../../../Context/OnboardContext"; 
import {sendBatchPublicMintFunc} from "../../../../../Context/OnboardContext"; 


import { simpleCsv2Array } from "../../../../../Utils/csv2Array";
import rows from "./rows.csv";

const DevPanel = (props) => {
  let blockchain = useContext(BlockChainContext);
  // let onboard = useContext(OnboardContext);

  let getAbi = blockchain.getAbi;
  const getList = blockchain.whiteListCheck;
  // const HashGen = blockchain.newIpfsHashGen;
  const isRevealed = blockchain.isRevealed;
  // const getPremintStatus = onboard.getPremintStatus;
  // const getPremintStagePrice = onboard.getPremintStagePrice;
  // const premintStageMint = onboard.premintStageMint;
  // const onboardLogin = onboard.onboardLogin;
  // const getOnboardAccount = onboard.getAccount;

  const ownerMintDnaRef = useRef("");
  const tokenIdForUriRef = useRef("");
  const baseUriRef = useRef("");
  const preMintBatchSizeRef = useRef("");
  const publicMintBatchSizeRef = useRef("");

  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            align="center"
            onClick={async () => {
              await Login();
            }}
            size="large"
          >
            Onboard Login
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            align="center"
            size="large"
            onClick={async () => {
              getAccount();
              //  let account = await getOnboardAccount();

              // alert(account);
            }}
          >
            get OnboardAccount
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            align="center"
            size="large"
            onClick={async () => {
              let val = await getIsPremintStageActiveFunc();
              console.log(val);
              // alert(val);
            }}
          >
            getIsPremintStageActiveFunc
          </Button>
        </Grid>


        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            align="center"
            size="large"
            onClick={async () => {  
             let isWhite = await getList("0x");
            }}
          >
            check in whiteList
          </Button>
        </Grid>

        <Grid container item xs={12} md={12} my={3} textAlign="center">
        <Grid item xs={4} md={4} ml={{ xs: 2, md: 12 }}>
          <Button
            variant="contained"
            color="secondary"
            align="center"
            size="large"
            onClick={() => {
              sendBatchPremintFunc(preMintBatchSizeRef.current.value)
            }}
          >
            Send Premint
          </Button>
        </Grid>

        <Grid item xs={5} ml={{ xs: 1, md: 1 }}>
          <TextField
            id="outlined-basic"
            label="Premint Batch Size"
            variant="outlined"
            type="number"
            InputProps={{ inputProps: { min: 1, max: 30 } }}
            inputRef={preMintBatchSizeRef}
            fullWidth
          />
        </Grid>
      </Grid>



      <Grid container item xs={12} md={12} my={3} textAlign="center">
        <Grid item xs={4} md={4} ml={{ xs: 2, md: 12 }}>
          <Button
            variant="contained"
            color="secondary"
            align="center"
            size="large"
            onClick={() => {
              sendBatchPublicMintFunc(publicMintBatchSizeRef.current.value)
            }}
          >
            Send Public Mint
          </Button>
        </Grid>

        <Grid item xs={5} ml={{ xs: 1, md: 1 }}>
          <TextField
            id="outlined-basic"
            label="Public Mint Batch Size"
            variant="outlined"
            type="number"
            InputProps={{ inputProps: { min: 1, max: 30 } }}
            inputRef={publicMintBatchSizeRef}
            fullWidth
          />
        </Grid>
      </Grid>



      </Grid>
    </div>
  );
};

export default DevPanel;
