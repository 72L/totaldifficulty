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
    <div>
      <Head>
        <title>Total Difficulty of Ethereum Until The Merge</title>
        <meta name="description" content="Ethereum Total Difficulty Until The Merge" />
        <link rel="icon" href="/favicon.ico" />

      </Head>

      <main className='font-body'>
        <div className='container mx-auto my-auto'>
          <div className='h-screen flex flex-col justify-center items-center'>
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

      </footer>
    </div>
  )
}

export default Home
