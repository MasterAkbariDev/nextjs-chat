import React from 'react'
import '@/app/globals.css'
import { Provider } from 'react-redux'
import store from '@/app/GlobalRedux/store'
import MainLayout from '@/components/MainLayout/MainLayout'
import Head from 'next/head'

const index = () => {

  return (
    <Provider store={store}>
      <Head>
        <title>Nextjs + Redux Toolkit | Chat</title>
      </Head>
      <MainLayout />
    </Provider>
  )
}

export default index