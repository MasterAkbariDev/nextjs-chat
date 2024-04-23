'use client';

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slackToken = 'xapp-1-A068J13CD2S-6393269239972-78e7e194544b38fee2a12d1c50fddc2b635f2846af67ecc76bf595e4747ac3cd';
const oathToken = 'xoxb-6291828670053-6317045223441-vSH6GE1aX0vmft5FRjyj1gG2'

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
