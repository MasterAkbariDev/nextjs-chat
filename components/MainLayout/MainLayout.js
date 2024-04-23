import React, { useEffect, useState } from 'react'
import Box from '../Container/Box/Box'
import UsersContainer from '../Container/Users/UsersContainer'
import Chatbox from '../Container/Chatbox/Chatbox'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { newMessage, setAllUsers } from '@/app/GlobalRedux/Features/reducer'

const MainLayout = () => {

    const page = useSelector((state) => state.reducer.currentPage)
    const slackToken = useSelector((state) => state.reducer.socketToken)
    const oathToken = useSelector((state) => state.reducer.oathToken)

    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(0)
    const [webSocketError, setWebSocketError] = useState()
    const [errorText, setErrorText] = useState()
    const [channels, setChannels] = useState([]);



    let ws = null

    const webSocketConnector = async () => {
        try {
            if (ws !== null) {
                console.log('WebSocket connection already exists.');
                return;
            }
            const response = await axios.post('https://slack.com/api/apps.connections.open', {}, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': `Bearer ${slackToken}`
                }
            });
            const data = await response.data;
            console.log(data);
            ws = new WebSocket(data.url);
            ws.onopen = () => {
                console.log('WebSocket Connected');
            };

            ws.onmessage = (e) => {
                const message = JSON.parse(e.data);
                if (message.envelope_id)
                    ws.send(JSON.stringify(
                        { envelope_id: message.envelope_id }
                    ));
                if (message.payload && message.payload.event.type === 'message') {
                    dispatch(newMessage(message.payload.event))
                }
            };
            ws.onerror = (e) => {
                setWebSocketError('Error in Starting to WebSocket! ' + e)
            }
            ws.onclose = (e) => {
                console.log(e);
            };
        } catch (error) {
            setWebSocketError('There was an error in Connecting to WebSocket! ' + error.message)
        }
    };

    const receiveChannels = async () => {
        try {
            const receiveChannels = await axios('https://slack.com/api/conversations.list', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${oathToken}`,
                },
            });
            console.log(receiveChannels);
            const Channels = receiveChannels.data.channels.filter((item) => {
                if (item.is_member)
                    return item
            })
            setErrorText('')
            setChannels(Channels)
        } catch (error) {
            setErrorText('There was an error in Recieveing Channels! ' + error.message)
        }
    };

    const Start = async () => {
        try {
            await receiveChannels()
            await webSocketConnector()
        } catch (error) {
            setErrorText('Failed to fetch Slack data:', error)
        }
    }

    useEffect(() => {
        console.log(webSocketError);
    } , [webSocketError])
    
    useEffect(() => {
        console.log(errorText);
    } , [errorText])

    useEffect(() => {
        Start()
    }, [])

    useEffect(() => {
        dispatch(setAllUsers(channels))
    }, [channels])

    useEffect(() => {
        setCurrentPage(page)
    }, [page])

    return (
        <div className='flex justify-center items-center w-dvw h-dvh'>
            <Box className={`lg:h-3/4 lg:w-1/4 w-full h-full lg:mr-2 ${currentPage === 0 ? 'block' : 'hidden'} lg:block`}>
                <UsersContainer />
            </Box>
            <Box className={`lg:h-3/4 lg:w-1/2 w-full h-full  ${currentPage === 1 ? 'block' : 'hidden'} lg:block`}>
                <Chatbox />
            </Box>
        </div>
    )
}

export default MainLayout