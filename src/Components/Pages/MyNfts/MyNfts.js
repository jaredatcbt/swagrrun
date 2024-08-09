import { Grid, Container, Typography, Button } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import Web3 from "web3";
import {
  init,
  useConnectWallet,
  useSetChain,
  useWallets,
} from "@web3-onboard/react";
import SwagRunERC721Json from "../../../Contract/Metadata/SwagTokenWithMerkle_metadata.json";
import { Web3Context } from "../../../Context/Web3Context";
const { deployedERC721ContractAddress } = require("../../../secrets.json");

const MyNfts = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const swagRunERC721 = SwagRunERC721Json.output;
  const [_tokensList, setTokenList] = useState([]);
  const [CurrentAddress, setCurrentAddress] = useState(null);
  const [_web3Object, setWeb3Object] = useState(null);
  const [isLoading,setIsLoading] = useState(true)
  useEffect(() => {
    if (wallet) {
      setCurrentAddress(wallet.accounts[0]["address"]);
      initContract();
    }
  }, [wallet]);

  useEffect(() => {
    if (_web3Object) {
      getTokens();
    }
  }, [_web3Object]);

  var initContract = async () => {
    const web3 = new Web3(wallet.provider);
    let newSwagRunERC721Contract = await new web3.eth.Contract(
      swagRunERC721.abi,
      deployedERC721ContractAddress
    );
    // console.log(newSwagRunERC721Contract);
    setWeb3Object(newSwagRunERC721Contract);
  };
  var getTokens = async () => {
    var tokenArray = [];
    const balance = await _web3Object.methods.balanceOf(CurrentAddress).call();
    console.log(`Balance is: ${balance}`);
    for (let i = 0; i < balance; i++) {
      const tokenId = await _web3Object.methods
        .tokenOfOwnerByIndex(CurrentAddress, i)
        .call();
      tokenArray.push(tokenId);
    }
    setTokenList(tokenArray);
    setIsLoading(false)
  };

  return (
    <Container>
      <Typography variant="h2" align="center" my={5}>
        My Nfts
      </Typography>

     {_tokensList.length > 0 ?   <Grid container spacing={2}>
        {_tokensList.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} style={{ textAlign: "center" }}>
            <img
              src={`https://swagruntreasurehunt.s3.eu-central-1.amazonaws.com/swagruntresurehunt/${item}.png`}
              style={{ width: "95%", borderRadius: "10%", marginTop: "10px" }}
            />
            <Typography
              variant="h6"
              my={3}
              style={{ fontWeight: "400", margin: "15px 0px" }}
            >
              {`Swagrun #${item}`}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              sx={{ py: 2, alignItems: "center" }}
              style={{ padding: "7px 12px" }}
              onClick={() =>
                window.open(
                  `https://tofunft.com/nft/bsc/0x6b28E15eA6eBfE2C071E3CC224d78baDAfa0aaA8/${item}`,
                  "_blank"
                )
              }
            >
              View at Tofunet
            </Button>
          </Grid>
        ))}
      </Grid> :<div style={{textAlign:"center",margin:"100px 0px"}}>
      <Typography
              variant="h5"
              my={3}
              style={{ fontWeight: "400", margin: "15px 0px" ,color:"#E60E61"}}
            >
              You don't own any Swagrun
            </Typography>
      </div> } 
   
    </Container>
  );
};
export default MyNfts;
