import React, { useContext, useEffect, useState } from 'react'
import './MarketHome.css'
import marketBg from '../marketAssets/marketBg.png'
import NftCard from '../NFT/NftCard'
import { Link } from "react-router-dom";
import { Web3Context } from '../../../../Context/Web3Context';


const MarketHome = () => {
    const web3Object = useContext(Web3Context);
    const [marketContract, setMarketContract] = useState(web3Object.marketContract)
    const [accountAddress, setAccountAddress] = useState(web3Object.accountAddress)

    // useEffect(() => {
    //     console.log(web3Object.testNFTContract())
    // }, [])

    return (
        <div className='container-fluid d-flex justify-content-center markethome-wrapper' style={{ backgroundImage: `url(${marketBg})`, backgroundRepeat: 'repeat' }}>
            <div className='container'>

                {/* HEADER SECTION */}
                {/* HEADER SECTION */}
                {/* HEADER SECTION */}

                <div className='row pb-5'>
                    <div className='col-md-6 align-self-center'>
                        <p className='market-text1'>Welcome to SWAGrun Marketplace <span className='beta-btn'>Beta Version</span></p>
                        <p className='market-title'>Discover and Collect Swagstars NFTs</p>
                        <p className='market-text2'>Swagsies are tiny cute creatures that love bling items and compete against each other. Players can mint, race, collect or sell in Marketplace.</p>
                        <Link to={'/explore'}>
                            <button className='explore-btn mt-4'>Explore</button>
                        </Link>
                        <Link to={'/purchased'}>
                            <button className='mynft-btn mt-4 ml-3'>My Items</button>
                        </Link>
                    </div>
                    <div className='col-md-6 d-flex justify-content-center'>
                        <img src='/marketImages/headerSwagster.png' className='header-img md-12' />
                    </div>
                </div>

                {/* MARKET STEPS SECTION */}
                {/* MARKET STEPS SECTION */}
                {/* MARKET STEPS SECTION */}

                <div className='market-steps-section'>
                    <p className='market-heading'>Check Top Newest NFTs</p>

                    <div className='row mt-5'>
                        <div className='col-md-3 pr-3'>
                            <img src='/marketImages/add.png' className='steps-icon' />
                            <p className='market-text3 mt-4'>Add Your NFTs</p>
                            <p className='market-text2'>We are yet working on this section. Follow our socials to keep yourself updated.</p>
                        </div>
                        <div className='col-md-3 pr-3'>
                            <img src='/marketImages/item.png' className='steps-icon' />
                            <p className='market-text3 mt-4'>Resell Items You Buy</p>
                            <p className='market-text2'>We are yet working on this section. Follow our socials to keep yourself updated.</p>
                        </div>
                        <div className='col-md-3 pr-3'>
                            <img src='/marketImages/wallet.png' className='steps-icon' />
                            <p className='market-text3 mt-4'>Set Up Your Wallet</p>
                            <p className='market-text2'>We are yet working on this section. Follow our socials to keep yourself updated.</p>
                        </div>
                        <div className='col-md-3 pr-3'>
                            <img src='/marketImages/list.png' className='steps-icon' />
                            <p className='market-text3 mt-4'>List Items For Sale</p>
                            <p className='market-text2'>We are yet working on this section. Follow our socials to keep yourself updated.</p>
                        </div>
                    </div>
                </div>


                {/* EXPLORE SECTION */}
                {/* EXPLORE SECTION */}
                {/* EXPLORE SECTION */}

                {/* <div className='explore-section'>
                    <div className='d-flex justify-content-between'>
                        <p className='market-heading2'>Explore all Swagstars</p>
                        <p className='market-link-text1 align-self-center'>See All </p>
                    </div>

                    <div className='explore=section-nfts d-flex justify-content-between row mt-2'>
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


                {/* ADD ONS SECTION */}
                {/* ADD ONS SECTION */}
                {/* ADD ONS SECTION */}
                {/* <div className='addons-section mt-4'>
                    <div className='row'>
                        <div className='col-md-5 align-self-center'>
                            <p className='market-heading'>Swagstars Ad-Ons</p>

                            <ul className='addon-list'>
                                <li className='market-text1 mt-2'>Customized Swagstars</li>
                                <li className='market-text1 mt-2'>Advanced Character Ad-ons</li>
                            </ul>

                            <Link to={'/addons'}>
                                <button className='addon-btn mt-4'>Design your character</button>
                            </Link>
                        </div>

                        <div className='col-md-7'>
                            <img src='/marketImages/addonArt.png' className='addon-img' />
                        </div>
                    </div>
                </div> */}

            </div>
        </div>
    )
}

export default MarketHome