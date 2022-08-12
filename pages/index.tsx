import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Web3 from "web3";
import BigNumber from "../components/BigNumber";
import Countdown from "../components/Countdown";
import { MERGE_TOTAL_DIFFICULTY, RPC_ENDPOINTS } from "../utils/constants";
import { predictMergeTime } from "../utils/predictMergeTime";

const defaultMergeTime = new Date(1663216163425);
const defaultTotalDifficulty = "56195695917284349566861";
const defaultBlockNumber = "15327562";

const Home: NextPage = () => {
  const [totalDifficulty, setTotalDifficulty] = useState<string>(
    defaultTotalDifficulty
  );
  const [latestBlockNumber, setLatestBlockNumber] =
    useState<string>(defaultBlockNumber);
  const [mergeTime, setMergeTime] = useState<Date>(defaultMergeTime);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      const randomEndpoint =
        RPC_ENDPOINTS[Math.floor(Math.random() * RPC_ENDPOINTS.length)];
      const web3 = new Web3(Web3.givenProvider || randomEndpoint);
      web3.eth.getBlock("latest").then((block) => {
        console.log(block);
        if (
          +block.totalDifficulty <= +MERGE_TOTAL_DIFFICULTY &&
          +block.totalDifficulty > +defaultTotalDifficulty
        ) {
          setLatestBlockNumber(block.number);
          setTotalDifficulty(`${block.totalDifficulty}`);
          predictMergeTime(web3, block).then((mergeDate) =>
            setMergeTime(mergeDate)
          );
        }
      });
    }, 5000);

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div className="h-screen font-body flex flex-col justify-between">
      <Head>
        <title>Total difficulty of Ethereum until The Merge</title>
        <meta
          name="og:title"
          content="Total difficulty of Ethereum until The Merge"
        />
        <meta name="og:image" content="https://www.totaldifficulty/card.png" />
        <meta
          name="twitter:image:src"
          content="https://www.totaldifficulty/card.png"
        />
        <meta
          name="twitter:title"
          content="Total difficulty of Ethereum until The Merge"
        />

        <meta
          name="description"
          content="Ethereum total difficulty until The Merge"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@reir" />

        <meta
          name="twitter:description"
          content="Ethereum total difficulty until The Merge"
        />
        <meta
          name="twitter:image"
          content="https://www.totaldifficulty/card.png"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-center items-center my-24">
            <div className="text-center my-4">
              Ethereum total difficulty at block {latestBlockNumber}
            </div>
            <BigNumber className="text-gray-500 animate-pulse">
              {totalDifficulty}
            </BigNumber>
            <BigNumber className="text-gray-700">
              {MERGE_TOTAL_DIFFICULTY}
            </BigNumber>
            <div className="text-center my-4">
              terminal total difficulty at Merge
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center my-24">
          <Countdown toDate={mergeTime} />
          <div className="text-center my-4">
            Merge estimated on{" "}
            {mergeTime.toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </div>
        </div>
      </main>

      <footer>
        <div className="flex flex-col justify-center items-center my-12">
          <a
            href="https://github.com/72L/totaldifficulty"
            className="text-gray-300"
          >
            Open Source
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
