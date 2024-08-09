import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { FaDiscord } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

import { Link as UnstyledLink } from "@mui/material";
import { Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import Links from "../../Resources/Links/Links.json";
import SwagRunLogo from "../../Resources/Logo/swagRunLogo.png";

import { Typography, Grid } from "@mui/material";

import LinkIconTemplate from "../../Components/UI/LinkIconTemplate/LinkIconTemplate";

import styled from "styled-components";

import { useMediaQuery, useTheme } from "@mui/material";

const StyledFooter = styled(Grid)`
  max-width: 80vw;
  margin: auto;
  margin-top: 5vh;
  display: ${(props) => (props.$screenissmall ? "flex" : "")};
  justify-content: ${(props) => (props.$screenissmall ? "center" : "")};
  padding-top: 40px;
  padding-bottom: 0px;

  border-bottom: #c70716 solid 3px;
`;

const StyledLink = styled(UnstyledLink)`
  color: ${(props) => (props.$adminLink ? "firebrick" : "#bcbcbc")};
  margin-left: 1.2vw;
  font-size: ${(props) =>
    props.$adminLink
      ? props.$screenIsLarge
        ? "32px"
        : "20px"
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

const Footer = (props) => {
  let theme = useTheme();
  let isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        borderTop: "1px solid gray",
        marginTop: 5,
        maxWidth: "96vw",
        marginX: "auto",
      }}
    >
      <StyledFooter
        container
        alignItems="center"
        $screenissmall={isScreenSmall}
        component="footer"
      >
        <Grid item xs={12} md={8}>
          <img src={SwagRunLogo} width="15%" />
        </Grid>
        <Grid item xs={12} md={1} container display="flex"></Grid>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          <Typography color="#e60e61" style={{ marginLeft: "10px" }}>
            Quick Links
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          <Typography fontSize="14px" sx={{ paddingBottom: "10px" }}>
            The content of this webpage, downloadable content, interactable
            content, and links to other webistes or media are not investment
            advice and do not constitute any offer or solicitation to offer or
            reccomendation of any investment proudct. It is for general purposes
            only and does not take into account your individual needs,
            investment objectives and specific financial instruments{" "}
          </Typography>
        </Grid>

        <Grid item xs={12} md={1} container display="flex"></Grid>
        <Grid
          item
          xs={12}
          md={3}
          container
          display="flex"
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          <Grid item xs={6}>
            <SingleNavLink component={RouterLink} to="/">
              Home
            </SingleNavLink>
          </Grid>
          <Grid item xs={6}>
            <SingleNavLink component={RouterLink} to="homepage/team">
              Team
            </SingleNavLink>
          </Grid>
          <Grid item xs={6}>
            <SingleNavLink component={RouterLink} to="/">
              FAQ
            </SingleNavLink>
          </Grid>
          <Grid item xs={6}>
            <SingleNavLink component={RouterLink} to="/">
              About
            </SingleNavLink>
          </Grid>
          <Grid item xs={6}>
            {/* <SingleNavLink component={RouterLink} to="/">
              Roadmap
            </SingleNavLink> */}
          </Grid>
        </Grid>

        <Grid container item xs={12} md={3}>
          <Grid item xs={2}>
            <LinkIconTemplate href={Links.telegram}>
              <TelegramIcon />
            </LinkIconTemplate>
          </Grid>

          <Grid item xs={2}>
            <LinkIconTemplate href={Links.instagram}>
              <InstagramIcon />
            </LinkIconTemplate>
          </Grid>

          <Grid item xs={2}>
            <LinkIconTemplate href={Links.twitter}>
              <TwitterIcon />
            </LinkIconTemplate>
          </Grid>

          <Grid item xs={2}>
            <LinkIconTemplate href={Links.discord}>
              <FaDiscord />
            </LinkIconTemplate>
          </Grid>

          <Grid item xs={2}>
            <LinkIconTemplate href={Links.youtube}>
              <YouTubeIcon />
            </LinkIconTemplate>
          </Grid>

          <Grid item xs={2}>
            <LinkIconTemplate href={Links.tiktok}>
              <FaTiktok />
            </LinkIconTemplate>
          </Grid>
        </Grid>
      </StyledFooter>
    </Box>
  );
};

export default Footer;
