import Links from "../../../../Resources/Links/Links.json";

import { Web3Context } from "../../../../Context/Web3Context";

import { useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as UnstyledLink } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { useContext } from "react";
import Swal from "sweetalert2";

const StyledP = styled(Typography)`
  color: #bcbcbc;
  margin-left: ${(props) => (props.$adminLink ? "2.4vw" : "1.2vw")};
  font-size: ${(props) =>
    props.$adminLink
      ? props.$screenIsLarge
        ? "30px"
        : "18px"
      : props.$screenIsLarge
      ? "20px"
      : "14px"};

  :hover {
    cursor: pointer;
    text-decoration-line: underline;
    color: #0056b3;
  }
`;

const StyledLink = styled(UnstyledLink)`
  color: ${(props) => (props.$adminLink ? "firebrick" : "#bcbcbc")};
  margin-left: ${(props) => (props.$adminLink ? "2.4vw" : "1.2vw")};
  font-size: ${(props) =>
    props.$adminLink
      ? props.$screenIsLarge
        ? "30px"
        : "18px"
      : props.$screenIsLarge
      ? "20px"
      : "14px"};
  text-decoration-line: none;
`;

const SingleNavLink = (props) => {
  const theme = useTheme();
  let screenIsLarge = useMediaQuery(theme.breakpoints.up("xl"));
  return (
    <StyledLink
      $screenIsLarge={screenIsLarge}
      $adminLink={props.adminLink}
      component={RouterLink}
      to={props.to}
    >
      {props.children}
    </StyledLink>
  );
};

const NavLinks = (props) => {
  const web3Object = useContext(Web3Context);
  let isConnected = Boolean(web3Object.isWallet);
  const isOwnerLoggedIn = web3Object.isOwnerLoggedIn;
  const theme = useTheme();
  let screenIsLarge = useMediaQuery(theme.breakpoints.up("xl"));
  const popup = (text) => {
    Swal.fire({
      title: text,
      // text: 'User is delete',

      confirmButtonText: "Ok",
    });
  };
  return (
    <>
      <SingleNavLink to="/">Home</SingleNavLink>

      {isConnected && <SingleNavLink to="/">Inventory</SingleNavLink>}

      <SingleNavLink to="/market">Marketplace</SingleNavLink>

      <SingleNavLink to="homepage/team">Team</SingleNavLink>

      <StyledLink
        $screenIsLarge={screenIsLarge}
        href={Links.audit}
        target="_blank"
      >
        Audit
      </StyledLink>

      <StyledLink
        $screenIsLarge={screenIsLarge}
        style={{ cursor: "pointer" }}
        href={Links.pinksale}
        target="_blank"
      >
        {" "}
        KYC{" "}
      </StyledLink>
      <SingleNavLink to="mynfts">My Nfts</SingleNavLink>
      {isOwnerLoggedIn && (
        <SingleNavLink adminLink to="/admin">
          Admin
        </SingleNavLink>
      )}
    </>
  );
};

export default NavLinks;
