import React from 'react'
import './Loader.css'

const Loader = () => {
    return (
        <div className="three-body w-full h-full self-center">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
        </div>
    )
}

export default Loader