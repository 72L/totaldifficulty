import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import Web3 from 'web3'
import BigNumber from '../components/BigNumber'

const Home: NextPage = () => {

  const web3 = new Web3(Web3.givenProvider || "https://eth-rpc.gateway.pokt.network");
  const [totalDifficulty, setTotalDifficulty] = useState("56177456570298838238278")

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      web3.eth.getBlock('latest').then(block => setTotalDifficulty(`${block.totalDifficulty}`))
    }, 10000);

    return () => clearInterval(refreshInterval);
  }, [])

  return (
    <div className='h-screen font-body flex flex-col justify-between'>
      <Head>
        <title>Total difficulty of Ethereum until The Merge</title>
        <meta name="og:title" content="Total difficulty of Ethereum until The Merge" />
        <meta name="og:image" content="https://www.totaldifficulty/card.png" />
        <meta name="twitter:title" content="Total difficulty of Ethereum until The Merge" />

        <meta name="description" content="Ethereum total difficulty until The Merge" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@reir" />
        <link rel="icon" href="/favicon.ico" />

      </Head>

      <main>
        <div className='container mx-auto'>
          <div className='flex flex-col justify-center items-center my-24'>
            <div className='my-4'>Ethereum total difficulty</div>
            <div className='flex flex-col items-center'>
              <BigNumber className='text-gray-500 animate-pulse'>{totalDifficulty}</BigNumber>
              <BigNumber className='text-gray-700'>58750000000000000000000</BigNumber>
            </div>
            <div className='my-4'>until the Merge</div>

          </div>
        </div>
      </main>

      <footer>
        <div className='flex flex-col justify-center items-center my-12'>
          <a href='https://github.com/72L/totaldifficulty' className='text-gray-300'>Open Source</a>
        </div>
      </footer>
    </div>
  )
}

export default Home
