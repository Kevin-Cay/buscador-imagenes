import React from 'react'
import './DetailModal.css'

const DetailModal = ({ isOpen = false, data, onClose }) => {


    if (!isOpen) return (<></>)

    return (
        <div className='background' onClick={() => onClose?.()} >
            <div className='modal'>
                <p>{data?.description}</p>
                <p><span>{data?.alt_description}</span></p>
                <img className='image' src={data?.urls.full} alt={data?.alt_description} />
            </div>
        </div>
    )
}

export default DetailModal
