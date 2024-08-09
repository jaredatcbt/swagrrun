import ButtonBase from "@mui/material/ButtonBase";

import { useContext } from "react";

import { Web3Context } from "../../Context/Web3Context";

import styled from "styled-components";

const WalletButtonComponent = styled(ButtonBase)`
  &.walletButton {
    box-sizing: border-box;
    background-color: ${(props) => (props.$isconnected ? "#111" : "#6e6e6e")};

    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${(props) => (props.$isconnected ? "#E60E61" : "#000")};
    font-size: 1rem;
    line-height: 1.4;
    font-weight: 600;
    font-family: "MuseoModerno", "Roboto", "Arial";
    width: clamp(70px,150px,300px);
    height: clamp(50px,60px,100px);
    /* padding: ${(props) => (props.$isMobile ? "20% 60%" : "15% 60%")}; */
    margin: 10% 0%;
    border: ${(props) => (props.$isconnected ? "1px solid #E60E61" : "")};

    :hover {
      background-color: ${(props) =>
        props.$isconnected ? "#6e6e6e" : "#E60E61"};
      transition: background-color 0.25s ease-in;
    }
  }
`;

const WalletButton = (props) => {
  let web3Properties = useContext(Web3Context);
  const onboardLogin = web3Properties.onboardLogin;
  const onboardDisconnect = web3Properties.onboardDisconnect;
  let isMobile = web3Properties.isMobile;

  let isConnected = Boolean(web3Properties.isWallet);

  let buttonText = isConnected ? "Disconnect" : "Connect";

  async function connectionHandler() {
    if(isConnected) await onboardDisconnect(); 
    else await onboardLogin();
  }

  // let isDisable = isConnected;

  return (
    <>
      <WalletButtonComponent
        className="walletButton"
        $isconnected={isConnected}
        $isMobile={isMobile}
        // disabled={isDisable}
        onClick={connectionHandler}
      >
        {buttonText}
    
      </WalletButtonComponent>
    </>
  );
};

export default WalletButton;
