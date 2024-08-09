import AdminPanel from "./AdminPanel/AdminPanel";
import { Button, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { useState, useContext } from "react";
import { Web3Context } from "../../../Context/Web3Context";

const AdminPage = (props) => {
  const web3 = useContext(Web3Context);
  let isNotConnected = !(Boolean(web3.isWallet));
  const isOwnerCall = web3.isOwnerCall;

  const [adminPanelOpenState, setAdminPanelOpenState] = useState(false);

  let buttonText = "";
  if (isNotConnected) {
    buttonText = "No Wallet Connected";
  } else {
    buttonText = "Open Admin Panel";
  }

  const openAdminPanelClickHandler = async () => {
    let isCurrentAccOwner = await isOwnerCall();
    if (isCurrentAccOwner) setAdminPanelOpenState(isCurrentAccOwner);
    else {
      Swal.fire(
        "Not Owner Account",
        "The currently active account is not the Owner Account",
        "error"
      );
    }
  };

  return (
    <div>
      <Typography variant="h2" align="center" mt={6}>
        Admin Panel
      </Typography>


      <Button
        variant="contained"
        align="center"
        size="large"
        onClick={openAdminPanelClickHandler}
        disabled={isNotConnected}
        sx={{ m: 5 }}
      >
        {buttonText}
      </Button>

      {adminPanelOpenState && (
        <Button
          variant="contained"
          align="center"
          size="medium"
          onClick={() => setAdminPanelOpenState(false)}
        >
          Lock Admin Panel
        </Button>
      )}

      {adminPanelOpenState && <AdminPanel mintHandler={props.MintHandler} />}
    </div>
  );
};

export default AdminPage;
