const whiteListAddresses = require("./whiteListAddresses.json");
const simpleCsv2Array = require("./csv2Array");
  
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

const express = require("express");
const cors = require("cors");


async function Main() {
  if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }

  let currentWhiteListAddresses = whiteListAddresses;
  let leafNodes = currentWhiteListAddresses.map((addr) => keccak256(addr));
  let merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

  let rootHash = merkleTree.getRoot();

console.log(merkleTree.toString(),"merkleTree");
}

Main();
