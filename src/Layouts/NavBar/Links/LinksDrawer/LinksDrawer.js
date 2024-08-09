import Links from "../../../../Resources/Links/Links.json";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";

import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { Link as UnstyledLink } from "@mui/material";

import LinkIconTemplate from "../../../../Components/UI/LinkIconTemplate/LinkIconTemplate";

import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { FaDiscord } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import Swal from "sweetalert2";

const IconSize = "40";

const StyledExternalLink = styled(UnstyledLink)`
  color: white;
  font-size: 1.6rem;
  display: inline;
  margin-left: 2vw;
  text-decoration-line: none;
  :hover {
    color: #c70716;
  }
`;

const StyledRouterLink = styled(RouterLink)`
  color: white;
  font-size: ${(props) => (props.$drawerSize ? "1.6rem" : "1.1rem")};
  display: inline;
  margin-left: 2vw;
  text-decoration-line: none;
  :hover {
    color: #c70716;
  }
`;

const LinkItem = (props) => {
  return (
    <StyledRouterLink
      $drawerSize={props.drawerSize}
      className="linkStyle"
      variant="h6"
      ml={2}
      to={props.to}
    >
      {props.children}
    </StyledRouterLink>
  );
};

const LinksDrawer = (props) => {
  const popup = (text) => {
    Swal.fire({
      title: text,
      // text: 'User is delete',

      confirmButtonText: "Ok",
    });
  };
  return (
    <Drawer
      anchor="right"
      open={props.drawerOpen}
      onClose={() => props.closeDrawerFunc(false)}
    >
      <Grid container alignItems="center" justify="center" maxWidth={"65vw"}>
        <Grid item xs={2}></Grid>
        <Grid
          item
          xs={6}
          my={1}
          onClick={() => props.closeDrawerFunc(false)}
          textAlign="center"
        >
          {props.buttonInside}
        </Grid>
        <Grid item xs={4}></Grid>

        <Grid
          item
          xs={4}
          style={{ textAlign: "center" }}
          onClick={() => props.closeDrawerFunc(false)}
        >
          <LinkIconTemplate href={Links.telegram}>
            <TelegramIcon style={{ fontSize: IconSize }} />
          </LinkIconTemplate>
        </Grid>

        <Grid
          item
          xs={8}
          style={{ textAlign: "center" }}
          onClick={() => props.closeDrawerFunc(false)}
        >
          <LinkIconTemplate href={Links.instagram}>
            <InstagramIcon style={{ fontSize: IconSize }} />
          </LinkIconTemplate>
        </Grid>

        <Grid
          item
          xs={4}
          style={{ textAlign: "center" }}
          onClick={() => props.closeDrawerFunc(false)}
        >
          <LinkIconTemplate href={Links.twitter}>
            <TwitterIcon style={{ fontSize: IconSize }} />
          </LinkIconTemplate>
        </Grid>

        <Grid
          item
          xs={8}
          style={{ textAlign: "center" }}
          onClick={() => props.closeDrawerFunc(false)}
        >
          <LinkIconTemplate href={Links.discord}>
            <FaDiscord style={{ fontSize: IconSize }} />
          </LinkIconTemplate>
        </Grid>

        <Grid
          item
          xs={4}
          style={{ textAlign: "center" }}
          onClick={() => props.closeDrawerFunc(false)}
        >
          <LinkIconTemplate href={Links.youtube}>
            <YouTubeIcon style={{ fontSize: IconSize }} />
          </LinkIconTemplate>
        </Grid>

        <Grid
          item
          xs={8}
          style={{ textAlign: "center" }}
          onClick={() => props.closeDrawerFunc(false)}
        >
          <LinkIconTemplate href={Links.tiktok}>
            <FaTiktok style={{ fontSize: IconSize }} />
          </LinkIconTemplate>
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="flex-start" alignItems="center">
        <List>
          <ListItem onClick={() => props.closeDrawerFunc(false)}>
            <LinkItem drawerSize to="/">
              Home
            </LinkItem>
          </ListItem>



          <ListItem
            onClick={() => {
              popup("Coming Soon");
              props.closeDrawerFunc(false);
            }}
          >
            <LinkItem drawerSize to="/">
              Marketplace
            </LinkItem>
          </ListItem>

          <ListItem onClick={() => props.closeDrawerFunc(false)}>
            <LinkItem drawerSize to="homepage/team">
              The Team
            </LinkItem>
          </ListItem>

          <ListItem onClick={() => props.closeDrawerFunc(false)}>
            <StyledExternalLink drawerSize target="_blank" href={Links.audit}>
              Audit
            </StyledExternalLink>
          </ListItem>
          <ListItem
            onClick={() => {
              props.closeDrawerFunc(false);
            }}
          >
            <StyledExternalLink
              drawerSize
              href={Links.pinksale}
              target="_blank"
            >
              KYC
            </StyledExternalLink>
          </ListItem>
          <ListItem onClick={() => props.closeDrawerFunc(false)}>
            <LinkItem drawerSize to="/mynfts">
              My Nfts
            </LinkItem>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default LinksDrawer;
