import React from 'react'
import UsersSearch from './UsersSearch'
import UserCard from './UsersCard'
import { useSelector } from 'react-redux'
import { fetchChatMessages } from '@/app/GlobalRedux/Features/reducer'

const UsersContainer = () => {

  const Users = useSelector((state) => state.reducer.searchUsers)
  const activeChannel = useSelector((state) => state.reducer.activeChannel)
  
  return (
    <div className='w-full h-full flex flex-col items-center'>
      <div className='w-5/6 py-5 flex justify-center'>
        <UsersSearch />
      </div>
      <div className='w-full h-full'>
        <UserCard data={Users} currentChannel={activeChannel.id} dispatchTo={fetchChatMessages} />
      </div>
    </div>
  )
}

export default UsersContainer