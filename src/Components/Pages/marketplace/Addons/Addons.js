import React from 'react'
import marketBg from '../marketAssets/marketBg.png'
import AddonCard from './AddonCard'
import './Addons.css'

const Addons = () => {
    return (
        <div className='container-fluid d-flex justify-content-center addons-wrapper' style={{ backgroundImage: `url(${marketBg})`, backgroundRepeat: 'repeat', backgroundSize: '200%' }}>
            <div className='container'>
                <div className='d-flex'>
                    <p className='explore-text1'>Market</p>
                    <p className='explore-text1 ml-2 '>&gt;</p>
                    <p className='explore-text2 ml-2'>Addons</p>
                </div>

                <p className='explore-heading1'>Swagstars Ad-Ons</p>

                <div className='row'>
                    <div className='col-md-5'>
                        <div className='preview-box'>
                            {/* <p className='adon-text1'>Preview Swagster Here</p> */}
                        </div>

                        <p className='adon-text2 mt-3'>Price</p>
                        <p className='adon-price-text'>22 BNB</p>
                        <button className='adon-mint-btn mt-3'>MINT</button>
                    </div>

                    {/* NFT LIST SECTIONS */}
                    {/* NFT LIST SECTIONS */}
                    {/* NFT LIST SECTIONS */}

                    <div className='col-md-7'>
                        <div className='d-flex justify-content-between'>
                            <button className='adon-category-btn'>Head</button>
                            <button className='adon-category-btn'>Body</button>
                            <button className='adon-category-btn'>Sword</button>
                            <button className='adon-category-btn'>Shield</button>
                            <button className='adon-category-btn'>Shoes</button>
                        </div>

                        <div className='row mt-4'>
                            <div className='col-sm-4'>
                                <AddonCard />
                            </div>
                            <div className='col-sm-4'>
                                <AddonCard />
                            </div>
                            <div className='col-sm-4'>
                                <AddonCard />
                            </div>
                        </div>

                        <div className='row mt-4'>
                            <div className='col-sm-4'>
                                <AddonCard />
                            </div>
                            <div className='col-sm-4'>
                                <AddonCard />
                            </div>
                            <div className='col-sm-4'>
                                <AddonCard />
                            </div>
                        </div>

                        
                    </div>

                </div>


            </div>
        </div>
    )
}

export default Addons