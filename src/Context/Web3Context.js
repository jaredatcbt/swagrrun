import SwagRunSvg from "../Resources/Logo/swagrunLogo.svg";
import SwagRunERC721Json from "../Contract/Metadata/SwagTokenWithMerkle_metadata.json";
import SwagrunERC20Json from "../Contract/Metadata/SwagrunERC20_metadata.json";
import SwagRunMarketJson from "../Contract/Metadata/SwagrunMarket.json";
import EnigmaNFTJson from "../Contract/Metadata/EnigmaNFT.json";
import { useNavigate } from "react-router-dom";
import getText from "../Utils/getText";

import { useMediaQuery, useTheme } from "@mui/material";

import Web3 from "web3";

import Swal from "sweetalert2";

import {
  init,
  useConnectWallet,
  useSetChain,
  useWallets,
} from "@web3-onboard/react";

import injectedModule from "@web3-onboard/injected-wallets";

import walletConnectModule from "@web3-onboard/walletconnect";

import { useState, useEffect, createContext } from "react";

const {
  // test721Address,
  deployedERC721ContractAddress,
  deployedERC20ContractAddress,
  deployedMarketContractAddress,
  testNFTContractAddress,
} = require("../secrets.json");

const axios = require("axios").default;

const swagRunERC721 = SwagRunERC721Json.output;
const swagRunERC20 = SwagrunERC20Json.output;
const swagRunMarket = SwagRunMarketJson;
const testEnigmaNFT = EnigmaNFTJson;

var web3 = "This is a web 3 instance";

const mainChain = "0x38";
// const testChain = "0x61";
// const reqChain = mainChain;

const injected = injectedModule();

const walletConnect = walletConnectModule({
  qrcodeModalOptions: {
    mobileLinks: ["metamask", "argent", "trust", "imtoken", "pillar"],
  },
});

const svgString = SwagRunSvg;

// initialize onboard
const web3Onboard = init({
  chains: [
    {
      id: "0x38",
      token: "BNB",
      label: "Binance Smart Chain Mainnet",
      rpcUrl: "https://bsc-dataseed1.binance.org",
    },
    // {
    //   id: "0x61",
    //   token: "TBNB",
    //   label: "Binance Smart Chain TestNet",
    //   rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
    // },
  ],
  wallets: [injected, walletConnect],
  appMetadata: {
    name: "SwagRun",
    icon: svgString,
    logo: svgString,
    description: "SwagRun using Onboard",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
    ],
  },
});

export const Web3Context = createContext({
  accountAddress: 0x0,

  processingStatus: false,

  pause: () => {},
  unpause: () => {},

  getPremintStatus: () => {},
  getPublicMintStatus: () => {},

  getPublicMintStagePrice: () => {},

  togglePremintStage: () => {},
  togglePublicMintStage: () => {},

  updatePremintStageLimitPerWallet: () => {},
  updatePublicMintStageLimitPerWallet: () => {},

  updatePremintStageTotalSupplyLimit: () => {},

  updatePremintStagePrice: () => {},
  updatePublicMintStagePrice: () => {},
  updateMerkleRoot: () => {},

  batchPreMint: () => {},
  batchPublicMint: () => {},
  batchOwnerMint: () => {},

  isOwnerCall: () => {},
  ownerMintByDna: () => {},
  onMintHandler: () => {},

  getTokenUriForId: () => {},
  reveal: () => {},
  updateBaseUri: () => {},
  isRevealed: () => {},
  isMobile: false,
  onboardLogin: () => {},
  onboardDisconnect: () => {},

  isOwnerLoggedIn: false,
  isWallet: null,
  balanceOf: () => {},
  tokenOfOwnerByIndex: () => {},
  getIsWhiteListedData: () => {},

  withdrawSevenTwoOneFunds: (_address, _quantity) => {},

  areContractsSetUp: false,
  contractInteractionHandler: (e, contractFunctionToUse, opts) => {},

  ///// ERC 20 Contract Methods

  getDepositInfo: (_address) => {},
  stake: (_amount) => {},
  redeem: () => {},

  marketContract: () => {},
  testNFTContract: () => {},
});

const Web3ContextProvider = (props) => {
  const navigate = useNavigate();
  const [processingState, setProcessingState] = useState(false);
  const [userAccountAddressState, setUserAccountAddressState] = useState("");
  const [
    ERC721MainNetContractAddressState,
    setERC721MainNetContractAddressState,
  ] = useState(deployedERC721ContractAddress);
  const [srERC20AddressState, setSrERC20AddressState] = useState(
    deployedERC20ContractAddress
  );

  // const [testContractState, setTestContractState] = useState(0x167e999b1596fcfEF77BbEE5734c81b296e081d0);
  const [erc721AddressState, setErc721AddressState] = useState(
    ERC721MainNetContractAddressState
  );

  const [isOwnerState, setIsOwnerState] = useState(false);

  const [swagRunERC721ContractState, setSwagRunERC721ContractState] =
    useState();

  const [srERC20ContractState, setSrERC20ContractState] = useState();

  const [swagRunMarketContract, setSwagRunMarketContract] = useState();
  const [testNFTContractState, setTestNFTContractState] = useState();

  const [areContractsSetUpState, setAreContractsSetupState] = useState();

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();
  const connectedWallets = useWallets();

  const theme = useTheme();
  let isTabletMQ = useMediaQuery(theme.breakpoints.down("sm"));

  let errorDisplay = false;

  async function onboardLoginFunc() {
    console.log("Onboard LoginFunc");
    await connect();

    // Don't forget to unsubscribe when your app or component un mounts to prevent memory leaks
    // unsubscribe()
    // await setChain({ chainId: reqChain });
  }

  const withdrawSevenTwoOneFundsFunc = async (_address, _quantity) => {
    let AmountInWei = web3.utils.toWei(String(_quantity), "ether");
    let val = await swagRunERC721ContractState.methods
      .transfer(_address, AmountInWei)
      .send({
        from: userAccountAddressState,
      });
    return val;
  };

  async function getAccount() {
    let val;
    val = wallet.accounts;
    if (Array.isArray(val)) {
      val = val[0].address;
    }

    setUserAccountAddressState(val);

    return val;
  }

  const getDepositInfoFunc = async (_address) => {
    if (srERC20ContractState) {
      try {
        let depositInfo = await srERC20ContractState.methods
          .getDepositInfo(_address)
          .call();
        return depositInfo;
      } catch (e) {
        console.error(e);
      }
    } else {
    }
  };

  const RedeemFunc = async (opts) => {
    let isMetaMask = opts.isMetaMask;

    try {
      console.log({ userAccountAddressState }, "redeem");
      console.log(srERC20ContractState, "srERC20ContractState");
      console.log(srERC20AddressState, "srERC20AddressState");

      if (isMetaMask) {
        let resultObj = await srERC20ContractState.methods
          .withdrawAll()
          .send({
            from: userAccountAddressState,
          })
          .on("receipt", function (receipt) {
            console.log(receipt);
          });

        return {
          success: true,
          isMetaMask: true,
          metaMaskResult: resultObj,
        };
      } else {
        let functionData = await srERC20ContractState.methods
          .withdrawAll()
          .encodeABI();
        console.log(functionData, "Function Hash is: ");

        // Draft transaction
        const tx = {
          to: srERC20AddressState, //required
          from: userAccountAddressState, // Required
          data: functionData, // Required
          value: web3.utils.toWei("0", "ether"),
        };

        const hash = await web3.eth.sendTransaction(tx);
        console.log(hash);

        return {
          success: true,
          isMetaMask: false,
          hash: hash,
        };
      }
    } catch (e) {
      console.error(e);
      return {
        success: false,
      };
    }
  };

  const contractInteractionHandlerFunc = async (
    e,
    contractFunctionToUse,
    opts = {}
  ) => {
    if (e) e.preventDefault();
    setProcessingState(true);
    errorDisplay = false;

    if (swagRunERC721ContractState && srERC20ContractState) {
      let swalError = {
        icon: "error",
        title: "Something went wrong",
        text: "Did you cancel the transaction?",
      };

      if (wallet.label === "MetaMask") {
        opts.isMetaMask = true;
      } else {
        opts.isMetaMask = false;
      }

      let contractInteractionResult = await contractFunctionToUse(opts);
      console.log(contractInteractionResult, "contractInteractionResult");

      if (contractInteractionResult.success) {
        let swalSuccess = {};
        let returnedTokenIDArray = [];

        let returnString = "";
        if (contractInteractionResult.isMetaMask) {
          let transferObj =
            contractInteractionResult.metaMaskResult.events.Transfer;

          if (!Array.isArray(transferObj)) {
            returnString = `TokenID: ${JSON.stringify(
              transferObj.returnValues.tokenId
            )}<br/> TxHash: ${transferObj.transactionHash}<br/><br/>`;
          } else {
            transferObj.map((item) => {
              let returnObj = {
                tokenID: item.returnValues.tokenId,
                txHash: item.transactionHash,
              };
              returnString += `TokenID: ${JSON.stringify(
                item.returnValues.tokenId
              )}<br/> TxHash: ${item.transactionHash}<br/><br/>`;
              returnedTokenIDArray.push(returnObj);
            });
          }
        }
        if (contractInteractionResult.hash) {
          let txHash = contractInteractionResult.hash;
          returnString = `Tx Hash: ${txHash}<br/> <a href=https://https://bscscan.com//tx/${txHash}">BscScan</a> <br/>`;
        }

        if (!returnedTokenIDArray) {
          returnedTokenIDArray = "";
        }

        swalSuccess = {
          title: "Successfully Minted!",
          html: returnString,
          icon: "success",
          color: "#999999",
          background: "#232323",
        };

        Swal.fire(swalSuccess);
        setProcessingState(false);
      } else {
        await setProcessingState(false);
        if (!errorDisplay) {
          Swal.fire(swalError);
          errorDisplay = false;
        }
      }
    } else {
      setProcessingState(false);
      Swal.fire("Error", "Is your net/account connected?", "error");
    }
  };

  const stakeFunc = async (opts) => {
    const _stake = opts.stake;

    if (_stake < 1) {
      Swal.fire("Error", "Must Stake At Least One Coin", "error");
      errorDisplay = true;
      return false;
    }
    let StakeInWei = web3.utils.toWei(String(_stake), "ether");
    let isMetaMask = opts.isMetaMask;

    console.log(isMetaMask, " isMetaMask stakeFunc");

    try {
      if (isMetaMask) {
        let resultObj = await srERC20ContractState.methods
          .stake(StakeInWei)
          .send({
            from: userAccountAddressState,
          })
          .on("receipt", function (receipt) {
            console.log(receipt);
          });

        return {
          success: true,
          isMetaMask: true,
          metaMaskResult: resultObj,
        };
      } else {
        let functionData = await srERC20ContractState.methods
          .stake(StakeInWei)
          .encodeABI();
        console.log(functionData, "Function Hash is: ");

        // Draft transaction
        const tx = {
          to: srERC20AddressState, //required
          from: userAccountAddressState, // Required
          data: functionData, // Required
          value: web3.utils.toWei("0", "ether"),
        };

        const hash = await web3.eth.sendTransaction(tx);
        console.log(hash);

        return {
          success: true,
          isMetaMask: false,
          hash: hash,
        };
      }
    } catch (e) {
      console.error(e);
      return {
        success: false,
      };
    }
  };

  const isOwnerFunc = async () => {
    try {
      let currentAccount = await getAccount();
      if (Array.isArray(currentAccount)) {
        currentAccount = currentAccount[0];
      }

      let tempSwagRunTokenContract = await new web3.eth.Contract(
        swagRunERC721.abi,
        erc721AddressState
      );

      let ownerAddress = await tempSwagRunTokenContract.methods.owner().call();

      const isOwnerLoggingIn =
        currentAccount.toUpperCase() === ownerAddress.toUpperCase();
      console.log(isOwnerLoggingIn, "  isOwnerLoggingIn");
      setIsOwnerState(isOwnerLoggingIn);
      return isOwnerLoggingIn;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const pauseFunc = async () => {
    try {
      await swagRunERC721ContractState.methods
        .pause()
        .send({
          from: userAccountAddressState,
        })
        .on("receipt", function (receipt) {
          console.log(receipt);
        });

      return true;
    } catch {
      return false;
    }
  };

  const unpauseFunc = async () => {
    try {
      await swagRunERC721ContractState.methods
        .unpause()
        .send({
          from: userAccountAddressState,
        })
        .on("receipt", function (receipt) {
          console.log(receipt);
        });

      return true;
    } catch {
      return false;
    }
  };

  const getTokenUriForIdFunc = async (_tokenID) => {
    try {
      let tokenUri = await swagRunERC721ContractState.methods
        .tokenURI(_tokenID)
        .call();
      console.log(tokenUri, "token URI");
      return tokenUri;
    } catch {
      return "Token ID Not Minted Yet";
    }
  };

  const getIsPremintStageActiveFunc = async () => {
    let val = await swagRunERC721ContractState.methods
      .isPremintStageActive()
      .call();
    return val;
  };

  const isPublicMintStageActiveFunc = async () => {
    let val = await swagRunERC721ContractState.methods
      .isPublicMintStageActive()
      .call();
    return val;
  };

  const isRevealedFunc = async () => {
    let val = await swagRunERC721ContractState.methods.revealed().call();
    return val;
  };

  const togglePremintStageFunc = async () => {
    let val = await swagRunERC721ContractState.methods
      .togglePremintStage()
      .send({
        from: userAccountAddressState,
      });

    return val;
  };

  const togglePublicMintStageFunc = async () => {
    let val = await swagRunERC721ContractState.methods
      .togglePublicmintStage()
      .send({
        from: userAccountAddressState,
      });
    return val;
  };

  const sendBatchPublicMintFunc = async (_batchSize, opts) => {
    let isPublicMintActive = await isPublicMintStageActiveFunc();
    if (!isPublicMintActive) {
      Swal.fire("Mint Not Active Yet!");
      errorDisplay = true;
      return false;
    }

    let minterAccount = await getAccount();
    let isMetaMask = false;

    if (wallet.label === "MetaMask") isMetaMask = true;
    console.log(wallet.label, "wallet.label");

    try {
      const singlePrice = await getPublicMintStagePriceFunc();

      const TotalPrice = String(singlePrice * _batchSize);

      if (isMetaMask) {
        let mintReturnObject = await swagRunERC721ContractState.methods
          .batchPublicMint(_batchSize)
          .send({
            from: minterAccount,
            value: TotalPrice,
          })
          .on("receipt", function (receipt) {
            console.log(receipt);
          });

        return ["isMetaMask", mintReturnObject];
      } else {
        let functionData = await swagRunERC721ContractState.methods
          .batchPublicMint(_batchSize)
          .encodeABI();
        console.log(functionData, "Function Hash is: ");

        // Draft transaction
        const tx = {
          to: erc721AddressState, // Required (for non contract deployments)
          from: minterAccount, // Required
          data: functionData, // Required
          value: TotalPrice,
        };

        const hash = await web3.eth.sendTransaction(tx);
        console.log(hash);

        return ["isOther", hash];
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const sendBatchPremintFunc = async (_batchSize, opts) => {
    let isPremintStageActive = await getIsPremintStageActiveFunc();
    if (!isPremintStageActive) {
      Swal.fire("Premint Not Active Yet!");
      errorDisplay = true;
      return false;
    }

    let isMetaMask = false;
    let merkleProof = opts.merkleProof;
    console.log(merkleProof, "merkleProof");
    console.log("sendBatchPremint");
    if (wallet.label === "MetaMask") isMetaMask = true;
    console.log(isMetaMask, "isMetaMask");
    let minterAccount = await getAccount();
    console.log(minterAccount, "minterAccount");
    try {
      // const singlePrice = await getPremintStagePriceFunc();
      // const TotalPrice = String(singlePrice * _batchSize);
      // console.log(TotalPrice, "TotalPrice");

      if (isMetaMask) {
        let mintReturnObject = await swagRunERC721ContractState.methods
          .batchPremint(_batchSize, merkleProof)
          .send({
            from: minterAccount,
            // value: TotalPrice,
          })
          .on("receipt", function (receipt) {
            console.log(receipt);
          });

        return ["isMetaMask", mintReturnObject];
      } else {
        let minterAccount = await getAccount();

        console.log(minterAccount + " minterAccount");

        let functionData = await swagRunERC721ContractState.methods
          .batchPremint(_batchSize, merkleProof)
          .encodeABI();
        console.log(functionData, "Function Hash is: ");

        // Draft transaction
        const tx = {
          to: erc721AddressState, // Required (for non contract deployments)
          from: minterAccount, // Required
          data: functionData, // Required
          // value: TotalPrice,
        };

        const hash = await web3.eth.sendTransaction(tx);
        console.log(hash);

        return ["isOther", hash];
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const batchOwnerMintFunc = async (_batchSize, opts) => {
    try {
      let mintReturnObject = await swagRunERC721ContractState.methods
        .batchOwnerMintToken(_batchSize)
        .send({
          from: userAccountAddressState,
        })
        .on("receipt", function (receipt) {
          console.log(receipt);
        });

      return ["isMetaMask", mintReturnObject];
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const onMintHandlerFunc = async (e, mintFunctionToUse, opts, _batchSize) => {
    if (e) e.preventDefault();
    setProcessingState(true);
    errorDisplay = false;

    if (swagRunERC721ContractState) {
      let swalError = {
        icon: "error",
        title: "Something went wrong",
        text: "Did you cancel the transaction?",
      };

      let mintResultObj = await mintFunctionToUse(_batchSize, opts);
      console.log(mintResultObj, "Result Object");

      if (mintResultObj) {
        let swalSuccess = {};
        let returnedTokenIDArray = [];

        let returnString = "";
        if (mintResultObj[0] === "isMetaMask") {
          let transferObj = mintResultObj[1].events.Transfer;

          if (!Array.isArray(transferObj)) {
            returnString = `TokenID: ${JSON.stringify(
              transferObj.returnValues.tokenId
            )}<br/> TxHash: ${transferObj.transactionHash}<br/><br/>`;
          } else {
            transferObj.map((item) => {
              let returnObj = {
                tokenID: item.returnValues.tokenId,
                txHash: item.transactionHash,
              };
              returnString += `TokenID: ${JSON.stringify(
                item.returnValues.tokenId
              )}<br/> TxHash: ${item.transactionHash}<br/><br/>`;
              returnedTokenIDArray.push(returnObj);
            });
          }
        }
        if (mintResultObj[0] === "isOther") {
          let txHash = mintResultObj[1].transactionHash;
          returnString = `Tx Hash: ${txHash}<br/> <a href=https://bscscan.com/tx/${txHash}">BscScan</a> <br/>`;
        }
        if (!returnedTokenIDArray) {
          returnedTokenIDArray = "";
        }

        swalSuccess = {
          title: "Sucessfully Minted!",
          html: returnString,
          icon: "success",
          color: "#999999",
          background: "#232323",
        };

        Swal.fire(swalSuccess).then((result) => {
          if (result.isConfirmed) {
            navigate("/mynfts");
          }
        });
        setProcessingState(false);
      } else {
        await setProcessingState(false);
        if (!errorDisplay) {
          Swal.fire(swalError);
          errorDisplay = false;
        }
      }
    } else {
      setProcessingState(false);
      Swal.fire("Error", "Is your net/account connected?", "error");
    }
  };

  const getBaseUri = async () => {
    let val = await swagRunERC721ContractState.methods.baseURI().call();
    console.log(val, "Base URI");
    return val;
  };

  const getPublicMintStagePriceFunc = async () => {
    console.log(swagRunERC721ContractState, "swagRunContractState");

    let publicMintStagePriceVarInWei = await swagRunERC721ContractState.methods
      .publicMintStagePrice()
      .call();

    return publicMintStagePriceVarInWei;
  };

  // const getPremintStagePriceFunc = async () => {
  //   let premintStagePriceVarInWei = await swagRunERC721ContractState.methods
  //     .premintStagePrice()
  //     .call();

  //   return premintStagePriceVarInWei;
  // };

  const updatePremintStagePriceFunc = async (_newPrice) => {
    let PriceInWei = String(web3.utils.toWei(_newPrice, "ether"));
    await swagRunERC721ContractState.methods
      .updatePremintStagePrice(PriceInWei)
      .send({
        from: userAccountAddressState,
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      });
  };

  const updatePublicMintStagePriceFunc = async (_newPrice) => {
    let PriceInWei = web3.utils.toWei(String(_newPrice), "ether");

    await swagRunERC721ContractState.methods
      .updatePublicMintStagePrice(PriceInWei)
      .send({
        from: userAccountAddressState,
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      });
  };

  const updateMerkleRootFunc = async (_newMerkleRoot) => {
    await swagRunERC721ContractState.methods
      .updateMerkleRoot(_newMerkleRoot)
      .send({
        from: userAccountAddressState,
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      });
  };

  const updatePublicMintStageLimitPerWalletFunc = async (_newLimit) => {
    await swagRunERC721ContractState.methods
      .updatePublicMintStageLimitPerWallet(_newLimit)
      .send({
        from: userAccountAddressState,
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      });
  };

  const updatePremintStageLimitPerWalletFunc = async (_newLimit) => {
    let functionData = await swagRunERC721ContractState.methods
      .updatePremintStageLimitPerWallet(_newLimit)
      .encodeABI();

    let minterAccount = await getAccount();

    // Draft transaction
    const tx = {
      to: erc721AddressState, // Required (for non contract deployments)
      from: minterAccount, // Required
      data: functionData, // Required
      value: web3.utils.toWei("0", "ether"),
    };

    const hash = await web3.eth.sendTransaction(tx);
    console.log(hash);

    return hash;
  };

  const updateBaseUriFunc = async (_baseURI) => {
    await swagRunERC721ContractState.methods
      .setBaseURI(_baseURI)
      .send({
        from: userAccountAddressState,
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      });
  };

  const revealFunc = async () => {
    await swagRunERC721ContractState.methods
      .reveal()
      .send({
        from: userAccountAddressState,
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      });
  };

  const updatePremintStageTotalSupplyLimitFunc = async (
    newTotalSupplyLimit
  ) => {
    let functionData = await swagRunERC721ContractState.methods
      .updatePremintStageTotalSupplyLimit(newTotalSupplyLimit)
      .encodeABI();

    let minterAccount = await getAccount();

    // Draft transaction
    const tx = {
      to: erc721AddressState, // Required (for non contract deployments)
      from: minterAccount, // Required
      data: functionData, // Required
      value: web3.utils.toWei("0", "ether"),
    };

    const hash = await web3.eth.sendTransaction(tx);
    console.log(hash);

    return hash;
  };

  const getTokenIDfromDNAFunc = async (_dna) => {
    let currentDNA = 0;
    let currentTokenID = 1;
    let jsonText = 0;
    let jsonObj = {};

    while (currentDNA != _dna) {
      let baseURI = await getBaseUri();
      jsonText = await getText(`${baseURI}${currentTokenID}.json`);

      try {
        jsonObj = JSON.parse(jsonText);
      } catch {
        console.log("Not parseable");
        return null;
      }
      currentDNA = jsonObj.dna;
      currentTokenID++;
      // if (currentTokenID > totalMints) return null;
    }

    currentTokenID--;
    return currentTokenID;
  };

  const ownerMintByDnaFunc = async (_ignore, opts) => {
    const _dna = opts.dna;
    const tokenIDToOwnerMint = await getTokenIDfromDNAFunc(_dna);
    if (!tokenIDToOwnerMint) {
      Swal.fire("No such DNA exists");
      errorDisplay = true;
      return null;
    }

    console.log(tokenIDToOwnerMint, "Token ID to Mint");

    try {
      let mintReturnObject = await swagRunERC721ContractState.methods
        .ownerMintTokenId(tokenIDToOwnerMint)
        .send({
          from: userAccountAddressState,
          value: web3.utils.toWei("0", "ether"),
        })
        .on("receipt", function (receipt) {
          console.log(receipt);
        });
      return {
        tokenID: mintReturnObject,
        status: true,
      };
    } catch {
      return false;
    }
  };

  const getIsWhiteListedDataFunc = async () => {
    let senderAddress = wallet.accounts[0].address;

    let responseObj = axios.get(
      `https://backend.swagrun.io/api/getIsWhiteListedData/${senderAddress}`
    );
    return responseObj;
  };

  const getMarketContract = () => {
    return swagRunMarketContract;
  };

  const getTestNFTContract = () => {
    return testNFTContractState;
  };

  let blockChainContextValue = {
    accountAddress: userAccountAddressState,

    processingStatus: processingState,

    pause: pauseFunc,
    unpause: unpauseFunc,

    getPremintStatus: getIsPremintStageActiveFunc,
    getPublicMintStatus: isPublicMintStageActiveFunc,

    // getPremintStagePrice: getPremintStagePriceFunc,
    getPublicMintStagePrice: getPublicMintStagePriceFunc,

    togglePremintStage: togglePremintStageFunc,
    togglePublicMintStage: togglePublicMintStageFunc,

    updatePremintStageLimitPerWallet: updatePremintStageLimitPerWalletFunc,
    updatePublicMintStageLimitPerWallet:
      updatePublicMintStageLimitPerWalletFunc,

    updatePremintStageTotalSupplyLimit: updatePremintStageTotalSupplyLimitFunc,

    updatePremintStagePrice: updatePremintStagePriceFunc,
    updatePublicMintStagePrice: updatePublicMintStagePriceFunc,
    updateMerkleRoot: updateMerkleRootFunc,

    batchPreMint: sendBatchPremintFunc,
    batchPublicMint: sendBatchPublicMintFunc,
    batchOwnerMint: batchOwnerMintFunc,

    isOwnerCall: isOwnerFunc,
    ownerMintByDna: ownerMintByDnaFunc,
    onMintHandler: onMintHandlerFunc,

    getTokenUriForId: getTokenUriForIdFunc,
    reveal: revealFunc,
    updateBaseUri: updateBaseUriFunc,
    isRevealed: isRevealedFunc,
    isMobile: isTabletMQ,
    onboardLogin: onboardLoginFunc,
    onboardDisconnect: () => disconnect(wallet),

    isOwnerLoggedIn: isOwnerState,
    isWallet: wallet,

    getIsWhiteListedData: getIsWhiteListedDataFunc,

    withdrawSevenTwoOneFunds: withdrawSevenTwoOneFundsFunc,

    contractInteractionHandler: contractInteractionHandlerFunc,

    getDepositInfo: getDepositInfoFunc,
    stake: stakeFunc,
    redeem: RedeemFunc,
    marketContract: getMarketContract,
    testNFTContract: testNFTContractState,

    areContractsSetUp: areContractsSetUpState,
  };

  useEffect(async () => {
    if (!wallet) {
      const previouslyConnectedWallets = JSON.parse(
        window.localStorage.getItem("connectedWallets")
      );

      console.log(previouslyConnectedWallets, "previouslyConnectedWallets");

      if (previouslyConnectedWallets.length > 0) {
        // Connect the most recently connected wallet (first in the array)
        await web3Onboard.connectWallet({
          autoSelect: {
            label: previouslyConnectedWallets[0],
            disableModals: true,
          },
        });
      }

      return false;
    } else {
      web3 = new Web3(wallet.provider);

      let newSwagRunERC721Contract = await new web3.eth.Contract(
        swagRunERC721.abi,
        erc721AddressState
      );

      let newSRERC20Contract = await new web3.eth.Contract(
        swagRunERC20.abi,
        srERC20AddressState
      );

      let newMarketContract = await new web3.eth.Contract(
        swagRunMarket.abi,
        deployedMarketContractAddress
      );

      let newTestNFTContract = await new web3.eth.Contract(
        testEnigmaNFT.abi,
        testNFTContractAddress
      );

      setSwagRunERC721ContractState(newSwagRunERC721Contract);
      setSrERC20ContractState(newSRERC20Contract);
      setSwagRunMarketContract(newMarketContract);
      console.log(newTestNFTContract, "newTestNFTContract in context");
      setTestNFTContractState(newTestNFTContract);

      isOwnerFunc();

      setAreContractsSetupState(true);
    }
  }, [wallet]);

  useEffect(() => {
    // if (wallet) setChain({ chainId: reqChain });
  }, [connectedChain]);

  useEffect(() => {
    if (connectedWallets && connectedWallets.length > 0) {
      const walletsSub = web3Onboard.state.select("wallets");
      const { unsubscribe } = walletsSub.subscribe((wallets) => {
        const connectedWallets = wallets.map(({ label }) => label);
        window.localStorage.setItem(
          "connectedWallets",
          JSON.stringify(connectedWallets)
        );
      });
    }
  }, [connectedWallets]);

  return (
    <Web3Context.Provider value={blockChainContextValue}>
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;
