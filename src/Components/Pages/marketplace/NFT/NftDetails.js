import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import './NftDetails.css'
import marketBg from '../marketAssets/marketBg.png'
import NftCard from './NftCard'
import { useParams } from 'react-router-dom'
import { Web3Context } from '../../../../Context/Web3Context';
import Web3 from 'web3'
import NFT from '../../../../Contract/Metadata/EnigmaNFT.json'
import Market from '../../../../Contract/Metadata/SwagrunMarket.json'
const { testNFTContractAddress, deployedMarketContractAddress } = require('../../../../secrets.json')
import Modal from 'react-modal';


const NftDetails = () => {
    const { contract, id } = useParams()
    const web3Object = useContext(Web3Context);
    const [marketContract, setMarketContract] = useState(web3Object.marketContract)
    const [wallet, setWallet] = useState(web3Object.isWallet)
    const [swagrunContract, setSwagrunContract] = useState(web3Object.testNFTContract)
    const [accountAddress, setAccountAddress] = useState(web3Object.accountAddress)
    const [dataLoader, setDataLoader] = useState(true)
    const [nftDetails, setNftDetails] = useState()
    const [listedNftDetails, setListedNftDetails] = useState()
    const [nftOwner, setNftOwner] = useState()
    const [isOwner, setIsOwner] = useState(false)
    const [isListed, setIsListed] = useState(false)
    const [isFixedItem, setIsFixedItem] = useState(false)
    const [isAuctionItem, setIsAuctionItem] = useState(false)
    const [listModalOpen, setListModalOpen] = useState(false)
    const [bidModalOpen, setBidModalOpen] = useState(false)
    const [listingType, setListingType] = useState("")
    const [fixedListingPrice, setFixedListingPrice] = useState(0)
    const [auctionBasePrice, setAuctionBasePrice] = useState(0)
    const [auctionEndTime, setAuctionEndTime] = useState(1)
    const [biddingPrice, setBiddingPrice] = useState(0)
    const [bidDetails, setBidDetails] = useState()
    const [auctionActive, setAuctionActive] = useState(false)
    const [isAuctionWinner, setIsAuctionWinner] = useState(false)

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
                contract
            )
            setSwagrunContract(NFTContract)

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
            setDataLoader(true)
            if (swagrunContract && marketContract && accountAddress) {
                // Checking and setting the owner of this NFT being viewed on screen
                const nftOwner = await swagrunContract.methods.ownerOf(id).call()
                setNftOwner(nftOwner)

                // Getting details of NFT if listed on Market Contract
                const listedNft = await marketContract.methods.fetchSingleItem(contract, id).call()
                console.log(listedNft)
                setListedNftDetails(listedNft)

                // conditions to check if NFT is listed or not, if listed then owner is fetched from the listed NFT
                if (nftOwner == deployedMarketContractAddress) {
                    console.log('listed')
                    setIsListed(true)
                    setIsFixedItem(listedNft.isFixedSale)
                    setIsAuctionItem(listedNft.isAuctionOpen)
                    if (listedNft.seller == accountAddress) {
                        console.log('listed and owner')
                        setIsOwner(true)
                    }

                } else {
                    if (accountAddress.toString().toLowerCase() == nftOwner.toString().toLowerCase()) {
                        console.log('Not listed and owner')
                        setIsOwner(true)
                    }
                }

                // Fetching metadata of Token from NFT Contract
                const nftUrl = await swagrunContract.methods.tokenURI(id).call();
                // console.log(nftUrl)
                const metaData = await axios.get(nftUrl)
                setNftDetails(metaData.data)
                // console.log(metaData.data)

                setDataLoader(false)
            } else {
                console.log("contract not found, or maybe address")
            }
        }

        fetchData()
    }, [accountAddress, swagrunContract, marketContract])

    useEffect(() => {
        const fetchData = async () => {
            if (nftDetails) {
                const bidDetails = await marketContract.methods.fetchSingleBid(contract, id).call()
                console.log(bidDetails)
                setBidDetails(bidDetails)

                // Check auction time status
                let blockTimeStamp = await marketContract.methods.getBlockTimeStamp().call()
                if (listedNftDetails.auctionEnds > blockTimeStamp) {
                    setAuctionActive(true)
                }
                if (bidDetails.bidPlacedBy == accountAddress) {
                    console.log('auction winner')
                    setIsAuctionWinner(true)
                }
            }
        }
        fetchData()
    }, [nftDetails])

    // List Item on Marketplace handler
    const listItemHandler = async () => {
        // Checking if market contract have an approval for token transfer or not
        const getApproved = await swagrunContract.methods.getApproved(id).call()
        console.log(getApproved)
        if (getApproved !== deployedMarketContractAddress) {
            await swagrunContract.methods.approve(deployedMarketContractAddress, id)
                .send({ from: accountAddress })
        }

        // calling listing function on type conditions i.e fixed and timed auction
        if (listingType === "fixed") {
            const priceToWei = Web3.utils.toWei(fixedListingPrice, "ether");
            await marketContract.methods.listItemOnFixedPrice(contract, id, priceToWei)
                .send({ from: accountAddress }, (err, trxHash) => {
                    if (err) {
                        setListModalOpen(false)
                    }
                })
            setListModalOpen(false)

        } else if (listingType === "auction") {
            const timestamp = await marketContract.methods.getBlockTimeStamp().call()
            // change this formula back to days count, this is in minutes now
            const auctionEndTimestamp = parseInt(timestamp) + (auctionEndTime * 60)
            // const auctionEndTimestamp = parseInt(timestamp) + (auctionEndTime*24*60*60)
            console.log(auctionEndTimestamp)
            const priceToWei = Web3.utils.toWei(auctionBasePrice, "ether");
            await marketContract.methods.listItemOnAuction(contract, id, priceToWei, auctionEndTimestamp)
                .send({ from: accountAddress })
            setListModalOpen(false)

        }
        window.location.reload()
    }

    // Buy NFT which is listed on Marketplace
    const buyNFtHandler = async () => {
        console.log("Buying funtion called")
        await marketContract.methods.buyNFtOnFixedPrice(contract, id)
            .send({ from: accountAddress, value: listedNftDetails.price })
        window.location.reload()
    }


    // Place a bid on the Item
    const placeBidHandler = async () => {
        console.info('place bid function called')
        const priceToWei = Web3.utils.toWei(biddingPrice, "ether");
        await marketContract.methods.placeBid(contract, id)
            .send({ from: accountAddress, value: priceToWei })
        setBidModalOpen(false)
        window.location.reload()
    }

    // Sell to Higest Bidder Handler
    const sellToBidderHandler = async () => {
        console.info('sell to bidder called')
        await marketContract.methods.sellToBidder(contract, id)
            .send({ from: accountAddress })
        window.location.reload()

    }

    // Remove ITEM From market Handler function
    const removeItemHandler = async () => {
        console.info('remove item called')
        if (listedNftDetails.isFixedSale && !listedNftDetails.isAuctionOpen) {
            console.info('removing fixed listing')
            await marketContract.methods.removeFixedItemFromMarket(contract, id)
                .send({ from: accountAddress })
        } else if (!listedNftDetails.isFixedSale && listedNftDetails.isAuctionOpen) {
            console.info('removing auction listing')
            await marketContract.methods.removeAuctionItemFromMarket(contract, id)
                .send({ from: accountAddress })
        }
        window.location.reload()
    }

    // Custom styles for Modal
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            borderRadius: '10px',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };


    // UI modal change functions
    const changeLabel1Style = () => {
        document.getElementById("label1").style.border = "2px solid #E60E61"
        document.getElementById("label2").style.border = "1px solid #E60E61"
        document.getElementById("label1").style.backgroundColor = "#e7dfdf"
        document.getElementById("label2").style.backgroundColor = "#fff"
    }
    const changeLabel2Style = () => {
        document.getElementById("label2").style.border = "2px solid #E60E61"
        document.getElementById("label1").style.border = "1px solid #E60E61"
        document.getElementById("label2").style.backgroundColor = "#e7dfdf"
        document.getElementById("label1").style.backgroundColor = "#fff"
    }

    return (
        <div className='container-fluid d-flex justify-content-center nft-detail-wrapper' style={{ backgroundImage: `url(${marketBg})`, backgroundRepeat: 'repeat', backgroundSize: '200%' }}>
            <div className='container'>
                <div className='d-flex'>
                    <p className='explore-text1'>Market</p>
                    <p className='explore-text1 ml-2 '>&gt;</p>
                    <p className='explore-text2 ml-2'>Explore</p>
                    <p className='explore-text1 ml-2 '>&gt;</p>
                    <p className='explore-text2 ml-2'>Details</p>
                </div>

                {/* NFT DETAILS SECTION */}
                {/* NFT DETAILS SECTION */}
                {/* NFT DETAILS SECTION */}
                <div className='nft-details-card'>
                    {dataLoader ? <div className='d-flex justify-content-center'>
                        <div className="spinner-border text-info" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                        : <div className='row'>
                            <div className='col-md-3 d-flex justify-content-center'>
                                <img src={nftDetails.image} className='nft-detail-img' />
                            </div>

                            <div className='col-md-9'>
                                <div className='row d-flex justify-content-between'>
                                    <div className='detail-description-div'>
                                        <p className='detail-title-text'>{nftDetails.name}</p>
                                        <p className='detail-text1'>{nftDetails.description}</p>
                                    </div>
                                    {!isListed ? <></> :
                                        <div className='detail-price-div'>
                                            {listedNftDetails.isFixedSale && !listedNftDetails.isAuctionOpen ?
                                                <p className='detail-price-text'>{Web3.utils.fromWei(listedNftDetails.price, "ether")} BNB</p>
                                                : <p className='detail-price-text'>
                                                    <b className='text-white'>Base Price</b><br />
                                                    {Web3.utils.fromWei(listedNftDetails.auctionBasePrice, "ether")} BNB
                                                </p>}
                                            {listedNftDetails.isAuctionOpen && bidDetails ? <>
                                                <p className='detail-text2 mt-3'>Top Bid</p>
                                                <p className='detail-bid-text'>{Web3.utils.fromWei(bidDetails.bidAmount, "ether")} BNB</p>
                                            </> : null}
                                        </div>}
                                </div>

                                {isListed ? <div className='row d-flex justify-content-between'>
                                    <div className='user-info-box'>
                                        <p className='detail-text2'>Seller</p>
                                        <p className='user-address-text'>{listedNftDetails.seller}...</p>
                                    </div>
                                </div> : <div className='row d-flex justify-content-between'>
                                    <div className='user-info-box'>
                                        <p className='detail-text2'>Owned By</p>
                                        <p className='user-address-text'>{nftOwner}</p>
                                    </div>
                                </div>}

                                {!isOwner && !isListed ? <div className='row d-flex mt-3'>
                                    <p className="text-white">Item Not Listed</p>
                                </div> : !isOwner && isListed && isFixedItem && !isAuctionItem ? <div className='row d-flex mt-3'>
                                    <button className='detail-buy-btn' onClick={buyNFtHandler}>BUY NOW</button>
                                </div> : !isOwner && isListed && !isFixedItem && isAuctionItem && auctionActive ? <div className='row d-flex mt-3'>
                                    <button className='detail-bid-btn' onClick={() => { setBidModalOpen(true) }}>PLACE BID</button>
                                </div> : !isOwner && isListed && !isFixedItem && isAuctionItem && !auctionActive && isAuctionWinner ? <div className='row d-flex mt-3'>
                                    <button className='detail-bid-btn' onClick={sellToBidderHandler}>CLAIM BID</button>
                                </div> : isOwner && !isListed ? <div className='row d-flex mt-3'>
                                    <button type='button' className='detail-buy-btn' onClick={() => { setListModalOpen(true) }}>List Item</button>
                                </div> : isOwner && isListed && bidDetails.bidAmount == 0 ? <div className='row d-flex mt-3'>
                                    <button className='detail-buy-btn' onClick={removeItemHandler}>Remove from Market</button>
                                </div> : <div></div>}

                                {/* Modals for Bid, List etc */}
                                <Modal
                                    isOpen={listModalOpen}
                                    onRequestClose={() => { setListModalOpen(false) }}
                                    style={customStyles}
                                    contentLabel="Listing Popup"
                                >
                                    <div className='container-fluid'>
                                        <p className='listing-div-title'>List {nftDetails.name} on Market</p>
                                        <div className='row d-flex justify-content-between modal-radio-container'>
                                            <input type="radio" name='listingType' className='list-type-radio' value="fixed" onChange={(e) => setListingType(e.target.value)} id="fixed-radio" />
                                            <label htmlFor='fixed-radio' className='list-type-label' onClick={changeLabel1Style} id="label1"><img src="https://img.icons8.com/ios-glyphs/36/E60E61/cheap-2.png" className='mr-2' />Fixed Price</label>
                                            <input type="radio" name='listingType' className='list-type-radio' value="auction" onChange={(e) => setListingType(e.target.value)} id="auction-radio" />
                                            <label htmlFor='auction-radio' className='list-type-label' onClick={changeLabel2Style} id="label2"><img src="https://img.icons8.com/ios-glyphs/30/E60E61/clock--v1.png" className='mr-2' />Timed Auction</label>
                                        </div>
                                        <div className='modal-info-container'>
                                            {listingType == "fixed" ? <div>
                                                <p className='listing-div-text1'>Set fixed price for {nftDetails.name}</p>
                                                <input type='number' value={fixedListingPrice} className="listing-price-input" onChange={(e) => setFixedListingPrice(e.target.value)} />
                                                <button className='modal-list-btn' onClick={listItemHandler}>List Now</button>
                                            </div> : listingType == "auction" ? <div>
                                                <p className='listing-div-text1'>Set base price for {nftDetails.name}</p>
                                                <span className='d-flex'>
                                                    <input type='number' value={auctionBasePrice} className="listing-price-input" onChange={(e) => setAuctionBasePrice(e.target.value)} />
                                                </span>
                                                <p className='listing-div-text1'>Auction will expire in <b>{auctionEndTime}</b> days</p>
                                                <input type='number' value={auctionEndTime} min={1} max={30} className="listing-price-input" onChange={(e) => setAuctionEndTime(e.target.value)} />
                                                <button className='modal-list-btn' onClick={listItemHandler}>List Now</button>
                                            </div> : null}
                                        </div>
                                    </div>
                                </Modal>

                                <Modal
                                    isOpen={bidModalOpen}
                                    onRequestClose={() => { setBidModalOpen(false) }}
                                    style={customStyles}
                                    contentLabel="Bid Popup"
                                >
                                    <p className='modal-label-text'>How much do you bid for {nftDetails.name}</p>
                                    <div>
                                        <input type='number' value={biddingPrice} className="bid-price-input" onChange={(e) => setBiddingPrice(e.target.value)} />
                                        <button className='modal-list-btn' onClick={placeBidHandler}>Bid Now</button>
                                    </div>
                                </Modal>

                            </div>
                        </div>}
                </div>

            </div>
        </div>
    )
}

export default NftDetails