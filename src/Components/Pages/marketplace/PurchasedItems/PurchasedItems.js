import React, { useContext, useEffect, useState } from 'react'
import '../Explore/Explore.css'
import '../MarketHome/MarketHome.css'
import marketBg from '../marketAssets/marketBg.png'
import NftCard from '../NFT/NftCard'
import { Web3Context } from '../../../../Context/Web3Context';
import Web3 from 'web3'
import NFT from '../../../../Contract/Metadata/EnigmaNFT.json'
import Market from '../../../../Contract/Metadata/SwagrunMarket.json'
import axios from 'axios'
const { testNFTContractAddress, deployedMarketContractAddress } = require('../../../../secrets.json')

const PurchasedItems = () => {
  const web3Object = useContext(Web3Context);
  const [dataLoader, setDataLoader] = useState(true)
  const [marketContract, setMarketContract] = useState(web3Object.marketContract)
  const [wallet, setWallet] = useState(web3Object.isWallet)
  const [swagrunContract, setSwagrunContract] = useState(web3Object.testNFTContract)
  const [accountAddress, setAccountAddress] = useState(web3Object.accountAddress)
  const [listedItemsId, setListedItemsId] = useState([])
  const [myNfts, setMyNfts] = useState([])

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
        NFT.abi,
        testNFTContractAddress
      )
      setSwagrunContract(NFTContract)
      // console.log(NFTContract)

      const marketContract = await new web3.eth.Contract(
        Market.abi,
        deployedMarketContractAddress
      )
      setMarketContract(marketContract)
      // console.log(marketContract)

    }
    fetchData()
  }, [wallet])

  useEffect(() => {
    const fetchData = async () => {
      if (marketContract) {
        const listedIds = await marketContract.methods.getListedIds(testNFTContractAddress).call()
        console.log(listedIds)

        let listedNfts = []
        for (let i = 0; i < listedIds.length; i++) {
          let listedNft = await marketContract.methods.fetchSingleItem(testNFTContractAddress, listedIds[i]).call()
          listedNfts.push(listedNft)
        }

        const myNfts = listedNfts.filter(nft => {
          return nft.owner == accountAddress
        })
        let allItems = []
        for (let i = 1; i <= myNfts.length; i++) {
          const nftOwner = await swagrunContract.methods.ownerOf(i).call()
          const nftUrl = await swagrunContract.methods.tokenURI(i).call();
          const metaData = await axios.get(nftUrl)
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
        setMyNfts(allItems)
        console.log(allItems)
      }
    }
    fetchData()
  }, [swagrunContract, marketContract])

  return (
    <div className='container-fluid d-flex justify-content-center explore-wrapper' style={{ backgroundImage: `url(${marketBg})`, backgroundRepeat: 'repeat', backgroundSize: '200%' }}>
      <div className='container'>
        <div className='d-flex'>
          <p className='explore-text1'>Market</p>
          <p className='explore-text1 ml-2 '>&gt;</p>
          <p className='explore-text2 ml-2'>Purchased Items</p>
        </div>

        {/* PURCHASED ITEMS SECTION */}
        {/* PURCHASED ITEMS SECTION */}
        {/* PURCHASED ITEMS SECTION */}

        <div className='d-flex justify-content-between mt-2'>
          <p className='explore-heading1'>Purchased Items</p>
          <p className='market-link-text1 align-self-center'>See All </p>
        </div>

        <div className='row'>
          <div className='col-md-4'>
            {myNfts.map((item) => <div className='col-md-4' key={item.itemId}>
              <NftCard item={item} accountAddress={accountAddress} nftContract={swagrunContract._address} isOwner={accountAddress.toString().toLowerCase() === item.itemOwner.toString().toLowerCase()} />
            </div>)}
          </div>
        </div>


        {/* ADDON SECTION */}
        {/* ADDON SECTION */}
        {/* ADDON SECTION */}
        {/* <div className='explore-adon-section'>
          <div className='d-flex justify-content-between mt-2'>
            <p className='explore-heading2'>Purchased Ad-Ons</p>
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
  )
}

export default PurchasedItems