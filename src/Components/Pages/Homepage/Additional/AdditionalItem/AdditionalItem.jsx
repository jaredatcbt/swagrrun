import { Grid, Typography } from "@mui/material";

import { Box } from "@mui/material";

const AdditionalItem = (props) => {
  let title = props.title;
  let para = props.para;
  return (
    <Grid
      item
      xs={12}
      md={4}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Box
        p={6}
        borderRadius="15%"
        boxShadow="0px 0px 5px 3px rgba(150,150,150,0.75) inset;"
        border="2px solid white"
        mt={1}
        width="90%"
        textAlign="center"
      >
        <Typography variant="body1" color="#E60E61" textAlign="center" mb={3}>
          {title}
        </Typography>

        <Typography>{para}</Typography>
      </Box>
    </Grid>
  );
};

export default AdditionalItem;
