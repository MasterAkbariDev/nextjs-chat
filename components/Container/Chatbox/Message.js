import React from 'react'

const Message = ({ subtype, name, img, time, children }) => {

    const date = new Date(time * 1000)

    return (
        subtype ? (
            <div className={`flex justify-center w-full py-3 break-words`}>
                <div className={`max-w-[75%] flex`}>
                    <div className={`bg-[#ccc] w-full rounded-full py-2 px-3 text-black flex flex-wrap`}>
                        <p className='w-full'>{children}</p>
                    </div>
                </div>
            </div>
        ) : (
            <div className={`flex justify-start w-full h-fit py-3 break-words`}>
                <div className={`max-w-[75%] flex h-fit`} >
                    <img src={img ? img : 'images/user.png'} className='rounded-full self-center w-[40px] h-[40px]' />
                    <div className={`flex flex-col w-full h-fit ml-3`}>
                        <div className={`bg-[#82ccdd] w-full h-fit rounded-full py-2 px-5 text-black`}>
                            <h2 className='bold text-xl'>
                                {name}
                            </h2>
                            <p className='text-justify ml-2'>
                                {children}
                            </p>
                        </div>
                        <div className={`${self ? 'text-right' : 'text-left'}`}>
                            <span className='text-gray-300 text-[11px]'>{date.getFullYear() + '/' + (date.getUTCMonth() + 1) + '/' + date.getUTCDay() + '-' + date.getHours() + ':' + date.getMinutes()}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default Message