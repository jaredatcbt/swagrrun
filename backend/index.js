const whiteListAddresses = require("./whiteListAddresses.json");
const simpleCsv2Array = require("./csv2Array");
  
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

const express = require("express");
const cors = require("cors");

const ethereum_address = require('ethereum-address');



async function Main() {
  if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }

  let currentWhiteListAddresses = [...whiteListAddresses];
  let leafNodes = currentWhiteListAddresses.map((addr) => keccak256(addr));
  let merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

  let rootHash = merkleTree.getRoot();

  const port = 3001;

  const app = express();
  app.use(cors());

  app.get("/api/getIsWhiteListedData/:address", (req, res) => {
    let address = req.params.address;
    let claimingAddresssHash = keccak256(address);
    const merkleProof = merkleTree.getHexProof(claimingAddresssHash);
    const isVerified = merkleTree.verify(
      merkleProof,
      claimingAddresssHash,
      rootHash
    );

    console.log(address,"Claiming Address");
    console.log(isVerified,"isVerified");
    console.log(merkleProof,"merkleProof");

    res.send({ merkleProof, isVerified });
  });

  const multer = require("multer");
  const fs = require("fs");
  const upload = multer({ dest: "uploads/" });

  app.post(
    `/api/upload/whitelist`,
    upload.single("whitelistFile"),
    (req, res) => {

      let errorFlag = false;

      const file = req.file;

      // console.log(title,"title");
      console.log(file,"file");

      fs.readFile(`${file.path}`, async function (err, data) {
        if (err) {
          console.error(err);
          return;
        }
        let uploadedCSV = data.toString();
        try {
          let newWhiteListAddresses = simpleCsv2Array(uploadedCSV);

          let leafNodes = newWhiteListAddresses.map((addr) => {
            if (ethereum_address.isAddress(addr)) {
            return keccak256(addr)
            }
            else {
              console.log("map error");
              errorFlag=true; 
              if(errorFlag) res.status(415).send({failed: true, faultyAddress:addr})
            }
          });

          if(errorFlag == true){
            return
          }
          console.log({leafNodes});

          merkleTree = new MerkleTree(leafNodes, keccak256, {
            sortPairs: true,
          });

          rootHash = merkleTree.getRoot();
          const root = merkleTree.getRoot().toString('hex');

          let rootWithHex = '0x'+root;
          console.log(rootWithHex,"rootWithHex");

          res.status(201).send({rootWithHex});

        } catch(e) {
          console.log(e);
          console.log("Wrong File Uploaded");
          res.status(400).send("Incorrect File Uploaded");
        }
      }); 
    }
  );

  app.listen(port, () => console.log(port, "port"));
}

Main();
