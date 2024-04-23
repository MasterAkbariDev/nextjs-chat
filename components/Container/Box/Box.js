import React from 'react'

const Box = ({ children , className }) => {
    return (
        <div className={`${className} text-white bg-black/40 rounded-3xl overflow-hidden`}>
            {children}
        </div>
    )
}

export default Box