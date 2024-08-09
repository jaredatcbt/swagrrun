import { Web3Context } from "../../../../../Context/Web3Context";
import AddIcon from "@mui/icons-material/Add";
import UploadIcon from "@mui/icons-material/Upload";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import axios from "axios";
import { useState, useContext } from "react";

const WhitelistPanel = () => {
  const web3Properties = useContext(Web3Context);
  const updateMerkleRoot = web3Properties.updateMerkleRoot;

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const selectHandler = (event) => {
    if (event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      console.log(event.target.files[0], "file");
      setIsFilePicked(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    console.log(formData);
    formData.append("whitelistFile", selectedFile);
    try {
      const response = await axios({
        method: "post",
        url: `https://backend.swagrun.io/api/upload/whitelist`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });


      let rootWithHex = response.data.rootWithHex;
      console.log(rootWithHex, "response.data.rootWithHex");
      try {
        await updateMerkleRoot(rootWithHex);
        Swal.fire("Success!", "Whitelist Updated", "success");
      } catch {
        Swal.fire("Failed!", "Something went wrong..", "error");
      }
    } catch (error) {
      let isFailure = error.response.data.failed;
      let faultyAddress = error.response.data.faultyAddress;
      if (isFailure) {
        Swal.fire(
          "Failed!",
          `Incorrect Address: ${faultyAddress}`,
          "error"
        );
        return false;
      }

    }
  };

  return (
    <div className="whitelist">
      <form onSubmit={handleSubmit}>
        <Button
          variant="contained"
          component="label"
          color={isFilePicked ? "success" : "secondary"}
        >
          <AddIcon /> Add Addresses CSV
          <input
            type="file"
            name="whitelistFile"
            hidden
            onChange={selectHandler}
          />
        </Button>
        <p>{isFilePicked ? selectedFile.name : ""}</p>
        <br />
        <Button
          variant="contained"
          component="label"
          color="secondary"
          disabled={isFilePicked ? false : true}
          fontSize="small"
        >
          <UploadIcon /> Whitelist
          <input type="submit" hidden value="Upload File" />
        </Button>
      </form>
    </div>
  );
};

export default WhitelistPanel;
