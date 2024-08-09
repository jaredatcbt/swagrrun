import NavLinks from "./Links/NavLinks/NavLinks";
import SmLinks from "./Links/SmLinks/SmLinks";
import LinksDrawer from "./Links/LinksDrawer/LinksDrawer";
import WalletButton from "../../Components/WalletButton/WalletButton";

import SwagRunLogo from "../../Resources/Logo/swagRunLogo.png";
import MenuIcon from "@mui/icons-material/Menu";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import IconButton from "@mui/material/IconButton";

import { useLocation, useNavigate } from "react-router-dom";

import { useState } from "react";

const NavBarWoScrollTrigger = () => {
  const [drawerOpenState, setDrawerOpenState] = useState(false);
  let { pathname } = useLocation();
  let navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      style={{
        zIndex: 15,
        backgroundColor: "black",
        transition: "all 1s",
      }}
    >
      <Toolbar>
        <ButtonBase
          disableRipple={true}
          sx={{ maxWidth: { xs: "35%", sm: "10%" } }}
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          <img src={SwagRunLogo} width="100%" />
        </ButtonBase>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            margin: "auto",
          }}
        >
          <NavLinks />
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            marginLeft: { xs: "none", md: "auto" },
            marginRight: { xs: "none", md: "auto" },
          }}
        >
          <WalletButton />
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          <SmLinks />
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" }, marginLeft: "auto" }}>
          <IconButton
            size="large"
            aria-label="MenuIcon"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => setDrawerOpenState(true)}
          >
            <MenuIcon />
          </IconButton>

          <LinksDrawer
            drawerOpen={drawerOpenState}
            closeDrawerFunc={() => setDrawerOpenState(false)}
            buttonInside={<WalletButton />}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBarWoScrollTrigger;
