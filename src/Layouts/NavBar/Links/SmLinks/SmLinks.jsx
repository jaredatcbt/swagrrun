import Links from "../../../../Resources/Links/Links.json";

import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import DiscordIcon from "../../../../Resources/Icons/DiscordIcon";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Instagram from "@mui/icons-material/Instagram";
import { FaTiktok } from "react-icons/fa";

import LinkIconTemplate from "../../../../Components/UI/LinkIconTemplate/LinkIconTemplate";

import { useTheme, useMediaQuery } from "@mui/material";
import  Swal from 'sweetalert2';

const SmLinks = (props) => {
  const theme = useTheme();
 
  // let screenIsMedium = useMediaQuery(theme.breakpoints.down("md"));
  let screenIsLarge = useMediaQuery(theme.breakpoints.up("xl"));

  let iconSize = screenIsLarge ? "xx-large" : "small";

  return (
    <>
      <LinkIconTemplate href={Links.telegram}>
        <TelegramIcon sx={{ fontSize: iconSize }} />
      </LinkIconTemplate>

      <LinkIconTemplate href={Links.instagram}>
        <Instagram sx={{ fontSize: iconSize }} />
      </LinkIconTemplate>

      <LinkIconTemplate href={Links.twitter}>
        <TwitterIcon sx={{ fontSize: iconSize }} />
      </LinkIconTemplate>

      <DiscordIcon screenIsLarge={screenIsLarge} />

      <LinkIconTemplate href={Links.youtube}>
        <YouTubeIcon sx={{ fontSize: iconSize }} />
      </LinkIconTemplate>

      <LinkIconTemplate href={Links.tiktok}>
        <FaTiktok style={{ fontSize: iconSize }} />
      </LinkIconTemplate>
    </>
  );
};

export default SmLinks;
