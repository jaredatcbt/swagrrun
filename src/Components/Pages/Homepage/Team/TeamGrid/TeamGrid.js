

import TeamMemberCard from "./TeamMemberCard/TeamMemberCard";

import { Grid } from "@mui/material";
import useFetch from "../../../../../Services/Apihook";
import { imageurl } from "../../../../../Services/urls";

const TeamsGrid = (props) => {
  const { loading, Content } = useFetch("s6-members?populate=*");

  let allTeamMemberArray = [];

  Content.map((item) => {
    let memberName = item.attributes?.name;
    let memberTitle = item.attributes?.title;
    let picturePath = item.attributes?.picture.data.attributes.url;

    let oneMemberArray = [memberName, memberTitle, picturePath];

    allTeamMemberArray.push(oneMemberArray);
  });

  return (
    <Grid container spacing={4}>
      {allTeamMemberArray.length > 0
        ? allTeamMemberArray.map((member, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <TeamMemberCard
                memberName={member[0]}
                memberTitle={member[1]}
                imgPath={`${imageurl}${member[2]}`}
              />
            </Grid>
          ))
        : ""}
    </Grid>
  );
};

export default TeamsGrid;
