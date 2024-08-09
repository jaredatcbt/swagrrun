import NavBarWoScrollTrigger from "./NavBarWoScrollTrigger.js";
import { useScrollTrigger } from "@mui/material";

export default function Navbar(props) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: props.window ? window() : undefined,
  });

  return (
    <>
      <NavBarWoScrollTrigger isScroll={trigger} />
    </>
  );
}
