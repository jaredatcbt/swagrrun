import IconButton from "@mui/material/IconButton";

const LinkIconTemplate = (props) => {
  return (
    <IconButton
      href={props.href}
      sx={{
        marginRight: props.marginR || "0",
        color: "#E60E61",
        width: props.width || "inherit",
      }}
      target="_blank"
      rel="noopener"
      disableRipple={true}
    >
      {props.children}
    </IconButton>
  );
};

export default LinkIconTemplate;
