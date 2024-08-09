import React from 'react'
import './AddonCard.css'

const AddonCard = () => {
  return (
    <div className='addon-card'>
        <div className='addon-img-div'></div>

        <div className='addon-detail-div'>
            <div className='d-flex justify-content-between'>
                <div>
                    <p className='addon-card-title'>Ice-cream Head</p>
                    <p className='addon-card-text1'>By Swagstars</p>
                </div>
                <div>
                    <p className='addon-card-text2'>Price</p>
                    <p className='addon-card-price'>22 BNB</p>
                </div>
            </div>

            <button className='add-preview-btn'>Add to Preview</button>
        </div>
    </div>
  )
}

export default AddonCard