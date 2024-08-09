import { Button, Typography } from "@mui/material";

import { useState, useContext } from "react";
import { Web3Context } from "../../../Context/Web3Context";

const DevPage = (props) => {
  const web3 = useContext(Web3Context);
  let isAddress = Boolean(web3.accountAddress);
  let walletCheck = web3.walletCheck;
  let isNotConnected = !(walletCheck && isAddress);
  const isOwnerCall = web3.isOwnerCall;
  const whiteListCheck = web3.whiteListCheck;

 
return(
        <Button
          variant="contained"
          align="center"
          size="medium"
          onClick={() => whiteListCheck()}
        >
WhiteList Check
        </Button>
)
}


export default DevPage;
