'use client';

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slackToken = 'xapp-1-A06BB6LFEUW-7004530358595-d6bc085bbe4d3612ac98b76b48324e5d64f6262ab95ac98f6afa577d4661957c';
const oathToken = 'xoxb-6291828670053-6391755265523-LeCY2hCDuJEXoiLvP47Ve9js'

export const fetchChatMessages = createAsyncThunk(
    'reducer/fetchChatMessages',
    async (channelId) => {
        try {
            const response = await axios.post('https://slack.com/api/conversations.history', { channel: channelId }, {
                headers: {
                    'Authorization': `Bearer ${oathToken}`,
                }
            })

            if (response.data.ok) {
                return response.data.messages
            }

        } catch (error) {
            console.log(error)
            throw error
        }
    }
)

export const Reducer = createSlice({
    name: 'reducer',
    initialState: {
        oathToken: oathToken,
        socketToken: slackToken,
        error: '',
        currentPage: 0,
        allUsers: [],
        searchUsers: [],
        activeChannel: -1,
        messages: null,
        isLoading: true,
    },
    reducers: {
        setAllUsers(state, action) {
            state.allUsers = action.payload.map(user => {
                let letters = '0123456789abcdef';
                let color = '#';
                let sumColor = ''
                for (var i = 0; i < 6; i++) {
                    sumColor = color += letters[Math.floor(Math.random() * 16)];
                }
                return {
                    ...user, bg: sumColor
                }
            });
            if (state.searchUsers.length < 1)
                state.searchUsers = state.allUsers
        },
        searchChatUser(state, action) {
            state.searchUsers = action.payload ? state.allUsers.filter(item => item.name.toLowerCase().includes(action.payload.toLowerCase())) : state.allUsers
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        addMessage(state, action) {
            state.messages = [...messages, action.payload]
        },
        newMessage(state, action) {
            if (state.activeChannel.id === action.payload.channel) {
                state.messages = [...state.messages, action.payload]
            }
        },
        setActiveChannel(state, action) {
            state.activeChannel = action.payload
        },
        setLoading(state, action) {
            state.isLoading = action.payload
        },
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChatMessages.fulfilled, (state, action) => {
                state.messages = action.payload.reverse()
                state.isLoading = false
            })
            .addCase(fetchChatMessages.rejected, (state, action) => {
                state.error = action.error.message
            })
    },
})

export const { setChatUser, setAllUsers, searchChatUser, setActiveChannel, setLoading, newMessage, setCurrentPage, addMessage, deleteUser } = Reducer.actions
