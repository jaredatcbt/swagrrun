import React, { useEffect } from 'react'
import './NftCard.css'
import { Link } from "react-router-dom";

const NftCard = ({ item, accountAddress, isOwner, nftContract }) => {

    return (
        <div className='nft-card'>
            <div className='row d-flex justify-content-center'>
                <img src={item.itemImage} className='nft-card-img' />
            </div>
            <p className='nft-card-title text-center mt-3'>{item.itemName}</p>
            {/* <p className='nft-card-description text-center'>{item.itemDescription}</p> */}

            {/* <div className='d-flex justify-content-between'>
                <p className='nft-card-price'>22 BNB</p>
                <p className='nft-card-bid-price'>44 BNB</p>
            </div> */}

            {isOwner ? <div className='d-flex justify-content-center mb-2'>
                <Link to={`/${nftContract}/${item.itemId}`} >
                    <button className='nft-card-sell-btn'>
                        SELL NOW
                    </button>
                </Link>
            </div> : <div className='d-flex justify-content-between mb-2'>
            <Link to={`/${nftContract}/${item.itemId}`} >
                    <button className='nft-card-buy-btn'>
                        BUY NOW
                    </button>
                </Link>
                <Link to={`/${nftContract}/${item.itemId}`} >
                    <button className='nft-card-bid-btn'>PLACE BID</button>
                </Link>
            </div>}
        </div>
    )
}

export default NftCard