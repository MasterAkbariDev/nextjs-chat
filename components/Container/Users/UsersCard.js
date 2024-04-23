import { setActiveChannel, setCurrentPage, setLoading } from '@/app/GlobalRedux/Features/reducer'
import React from 'react'
import { useDispatch } from 'react-redux'

const UserCard = ({ data, currentChannel, dispatchTo }) => {

    const dispatch = useDispatch()

    return (
        <ul className='w-full h-full overflow-y-auto flex flex-col no-scrollbar mb-5'>
            {data?.map((item, index) => {
                return (
                    <li key={index} className={`w-full flex ${currentChannel === item.id ? 'Card-active' : ''}`}>
                        <button onClick={() => {
                            dispatch(dispatchTo(item.id))
                            dispatch(setCurrentPage(1))
                            dispatch(setActiveChannel(item))
                            dispatch(setLoading(true))
                        }} className='block w-full py-3 px-3 flex items-center'>
                            <div className='w-full flex'>
                                {item.img ? <img src='/images/image.jpg' className='rounded-full w-[70px] h-[70px]' /> : (
                                    <div className={`rounded-full w-[70px] h-[70px] flex items-center justify-center`} style={{ backgroundColor: item.bg }}>
                                        <h2 className='text-4xl'>{item.name[0].toUpperCase()}</h2>
                                    </div>
                                )}
                                <div className="flex flex-col ml-3 mt-2">
                                    <h3 className='text-2xl'>{item.name}</h3>
                                </div>
                            </div>
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}

export default UserCard