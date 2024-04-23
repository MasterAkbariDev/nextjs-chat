import React, { useEffect, useState } from 'react'
import { ArrowLeft, Paperclip, SendFill } from 'react-bootstrap-icons'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '@/app/GlobalRedux/Features/reducer'
import axios from 'axios'
import Loader from '@/components/Loader/Loader'

const Chatbox = () => {

    const targetUser = useSelector((state) => state.reducer.chatUser)
    const messages = useSelector((state) => state.reducer.messages)
    const activeChannel = useSelector((state) => state.reducer.activeChannel)
    const oathToken = useSelector((state) => state.reducer.oathToken)
    const isLoading = useSelector((state) => state.reducer.isLoading)
    const [input, setInput] = useState('')
    const [user, setUser] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        document.getElementById('messagesContainer').scrollTo(0, document.getElementById('messagesContainer').scrollHeight)
    }, [messages])

    useEffect(() => {
        let keyDownHandled = false;
        const handleKeyDown = (e) => {
            if (e.key === 'Enter' && !(e.key === 'Enter' && e.shiftKey) && !keyDownHandled) {
                sendMessageHandler()
                keyDownHandled = true;
            }
        }

        document.getElementById('textarea')?.addEventListener('keypress', function (e) {
            if (e.key === 'Enter' && !(e.key === 'Enter' && e.shiftKey)) {
                e.preventDefault()
            }
        })

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            keyDownHandled = false;
        }
    }, [input])

    const sendMessageHandler = async () => {
        if (input) {
            try {
                await axios.post('https://slack.com/api/chat.postMessage', {
                    channel: activeChannel.id,
                    text: input
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${oathToken}`,
                    }
                });
                setInput('')
            } catch (error) {
                setErrorText('There was an error in Sending! ' + error.message)
            }
        }
    }

    return (
        <div className='w-full h-full flex flex-col'>
            <div className='bg-black/10 w-full h-fit py-4 p-1 flex justify-between items-center'>
                {messages ? (
                    <>
                        <div className='pl-5 flex flex-wrap grow'>
                            <div className='flex lg:hidden items-center mr-5'>
                                <button onClick={() => {
                                    dispatch(setCurrentPage(0))
                                }} className='block w-full h-full'>
                                    <ArrowLeft size={27} />
                                </button>
                            </div>
                            <div className='flex flex-col ml-4'>
                                <h3 className='text-2xl'>{activeChannel.name}</h3>
                                <span className='text-gray-300'>Members: {activeChannel.num_members}</span>
                            </div>
                        </div>
                    </>
                ) : ''}
            </div>
            <div id='messagesContainer' className={`py-5 px-7 w-full h-full grow overflow-y-auto ${isLoading ? 'flex flex-col justify-center items-center' : ''}`}>
                {messages ? (
                    isLoading ? <Loader /> :
                        messages.map((item, index) => {
                            return <Message key={index} img={item.bot_profile ? item.bot_profile.icons.image_36 : false} name={item.user} subtype={item.subtype ? true : false} time={item.ts}>{item.text}</Message>
                        })
                ) : <h2 className='text-2xl text-center break-words'>Please Select a conversation</h2>}
            </div>
            <div className='bg-black/10 w-full h-[120px] flex justify-between items-center'>
                {messages ? (
                    <div className='w-full h-full flex items-center bg-black/20'>
                        <label className='h-full flex items-center px-3 relative cursor-pointer'>
                            <input type='file' className='hidden' />
                            <Paperclip size={30} className='rotate-45' />
                        </label>
                        <textarea id='textarea' value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type something here...' className='w-full h-fit resize-none outline-none bg-transparent py-2 pr-2 no-scrollbar'></textarea>
                        <button onClick={sendMessageHandler} className='block h-full px-5 border-s border-black/20'>
                            <SendFill size={30} className='rotate-45' />
                        </button>
                    </div>
                ) : ''}
            </div>
        </div>
    )
}

export default Chatbox