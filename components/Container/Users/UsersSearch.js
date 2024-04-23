import { searchChatUser } from '@/app/GlobalRedux/Features/reducer'
import React, { useEffect, useState } from 'react'
import { Search } from 'react-bootstrap-icons'
import { useDispatch } from 'react-redux'

const UsersSearch = () => {

    const [input, setInput] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(searchChatUser(input))
    }, [input])

    return (
        <div className='w-full h-fit flex rounded-2xl z-1 w-full h-full bg-black/30 text-lg overflow-hidden'>
            <input value={input} onChange={(e) => setInput(e.target.value)} className='outline-none w-full shrink grow py-2 text-gray-300 focus:text-white/70 pl-3 bg-transparent' placeholder='Search...' />
            <label className='w-[40px] flex justify-center items-center'>
                <Search size={21} />
            </label>
        </div>
    )
}

export default UsersSearch