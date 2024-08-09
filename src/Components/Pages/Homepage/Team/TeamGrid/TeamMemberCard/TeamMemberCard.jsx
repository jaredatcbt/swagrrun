import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


const TeamMemberCard = (props) => {
  let memberName = props.memberName;
  let memberTitle = props.memberTitle;


  let imgFile = props.imgPath;

  const TeamCardBoxSX = {
    border: "8px solid #17161b",
    borderRadius: "10rem",
    boxShadow: "0px 0px 5px 5px rgba(215,215,215,0.75) inset",
    textAlign: "center",
    height: "100%"
  };

  return (
    <Box sx={TeamCardBoxSX}>
      <Box
        sx={{
          marginBottom: "5%",
          marginTop: "10%",
          width: "75%",
          aspectRatio: "1/1",
          marginX: "auto",
          borderRadius: "50%",
          backgroundColor: "rgba(200,30,30,0.15)",
          backgroundBlendMode: "multiply",
          backgroundImage: `url(${imgFile})`,
          backgroundSize: "cover",
          boxShadow: "0px 0px 15px 5px rgba(220,40,40,0.6) inset",
        }}
      ></Box>

      <Box pt={2} pb={8}>
        <Typography>{memberName} </Typography>
        <Typography variant="subtitle2" color="#848484">
          {memberTitle}
        </Typography>
      </Box>

    </Box>
  );
};

export default TeamMemberCard;
