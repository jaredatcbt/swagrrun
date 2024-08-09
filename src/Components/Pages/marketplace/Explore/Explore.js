import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import './Explore.css'
import Web3 from 'web3'
import marketBg from '../marketAssets/marketBg.png'
import NftCard from '../NFT/NftCard'
import NFT from '../../../../Contract/Metadata/SwagTokenWithMerkle_metadata.json'
import Market from '../../../../Contract/Metadata/SwagrunMarket.json'
import { Web3Context } from '../../../../Context/Web3Context';
const { deployedERC721ContractAddress, deployedMarketContractAddress } = require('../../../../secrets.json')

const Explore = () => {
  const web3Object = useContext(Web3Context);
  const [wallet, setWallet] = useState(web3Object.isWallet)
  const [marketContract, setMarketContract] = useState(web3Object.marketContract)
  const [swagrunContract, setSwagrunContract] = useState(web3Object.testNFTContract)
  const [accountAddress, setAccountAddress] = useState(web3Object.accountAddress)
  const [dataLoader, setDataLoader] = useState(false)

  let testNFTContract = web3Object.testNFTContract;
  const [allItems, setAllItems] = useState([]);
  const [loadedInt, setLoadedInt] = useState(6);

  let isConnected = Boolean(web3Object.isWallet);


  // LOAD WEB3 FUNCTION
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  // GREATING INSTANCES FOR CONTRACTS
  useEffect(() => {
    loadWeb3()
    const fetchData = async () => {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();

      if (accounts.length === 0) {
        console.log("no account conntected")
      } else {
        console.log(accounts[0])
        setAccountAddress(accounts[0])
      };
      let NFTContract = await new web3.eth.Contract(
        NFT.output.abi,
        deployedERC721ContractAddress
      )
      setSwagrunContract(NFTContract)
      console.log(NFTContract)

      const marketContract = await new web3.eth.Contract(
        Market.abi,
        deployedMarketContractAddress
      )
      setMarketContract(marketContract)
      console.log(marketContract)

    }
    fetchData()
  }, [wallet])

  useEffect(() => {
    console.log(allItems)
    const fetchData = async () => {
      setDataLoader(true)
      if (swagrunContract) {
        const totalSupply = await swagrunContract.methods.totalSupply().call()
        if (totalSupply && loadedInt<=totalSupply) {
          let allItems = []
          for (let i = 1; i <= loadedInt; i++) {
            const nftOwner = await swagrunContract.methods.ownerOf(i).call()
            const nftUrl = await swagrunContract.methods.tokenURI(i).call();
            const metaData = await axios.get(nftUrl)
            console.log(metaData)
            let itemObj = {
              itemId: i,
              itemOwner: nftOwner,
              itemName: metaData.data.name,
              itemDescription: metaData.data.description,
              itemAttributes: metaData.data.attributes,
              itemImage: metaData.data.image
            }
            allItems.push(itemObj)
          }
          setAllItems(allItems)
          setDataLoader(false)
        }
      }
    }

    fetchData()
    console.log(allItems)
  }, [swagrunContract])

  return (
    <div
      className="container-fluid d-flex justify-content-center explore-wrapper"
      style={{
        backgroundImage: `url(${marketBg})`,
        backgroundRepeat: "repeat",
        backgroundSize: "200%",
      }}
    >
      <div className="container">
        <div className="d-flex">
          <p className="explore-text1">Market</p>
          <p className="explore-text1 ml-2 ">&gt;</p>
          <p className="explore-text2 ml-2">Explore</p>
        </div>

        {/* ALL SWAGSTERS SECTION */}
        {/* ALL SWAGSTERS SECTION */}
        {/* ALL SWAGSTERS SECTION */}

        <div className="d-flex justify-content-between mt-2">
          <p className="explore-heading1">All Swagstars</p>
          <p className="market-link-text1 align-self-center">See All </p>
        </div>

        {dataLoader ? <div className='d-flex justify-content-center'>
          <div className="spinner-border text-info " role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div> : !dataLoader && allItems ? <div className='row'>
          {allItems.map((item) => <div className='col-md-4' key={item.itemId}>
            <NftCard item={item} accountAddress={accountAddress} nftContract={swagrunContract._address} isOwner={accountAddress.toString().toLowerCase() === item.itemOwner.toString().toLowerCase()} />
          </div>)}
        </div> : !dataLoader && allItems.length == 0 ? <p className='text-center text-light'>No listed NFTs</p> : <div></div>}


        {/* ADDON SECTION */}
        {/* ADDON SECTION */}
        {/* ADDON SECTION */}
        {/* <div className="explore-adon-section">
          <div className="d-flex justify-content-between mt-2">
            <p className="explore-heading1">Ad-Ons Swagsters</p>
            <p className="market-link-text1 align-self-center">See All </p>
          </div>

          <div className="d-flex mt-3">
            <button className="adon-category-btn">Head</button>
            <button className="adon-category-btn">Body</button>
            <button className="adon-category-btn">Backpack</button>
            <button className="adon-category-btn">Head Cover</button>
            <button className="adon-category-btn">Shoes</button>
          </div>

          <div className='row mt-3'>
            <div className='col-md-4'>
              <NftCard />
            </div>
            <div className='col-md-4'>
              <NftCard />
            </div>
            <div className='col-md-4'>
              <NftCard />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Explore;
