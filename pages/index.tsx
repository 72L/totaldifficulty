import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Web3 from "web3";
import BigNumber from "../components/BigNumber";
import Countdown from "../components/Countdown";
import { MERGE_TOTAL_DIFFICULTY } from "../utils/constants";
import { predictMergeTime } from "../utils/predictMergeTime";

const defaultMergeTime = new Date(1663216163425);
const defaultTotalDifficulty = "56177456570298838238278";

const Home: NextPage = () => {
  const [totalDifficulty, setTotalDifficulty] = useState<string>(
    defaultTotalDifficulty
  );
  const [mergeTime, setMergeTime] = useState<Date>(defaultMergeTime);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      const web3 = new Web3(
        Web3.givenProvider || "https://eth-rpc.gateway.pokt.network"
      );
      web3.eth.getBlock("latest").then((block) => {
        setTotalDifficulty(`${block.totalDifficulty}`);
        predictMergeTime(web3, block).then((mergeDate) =>
          setMergeTime(mergeDate)
        );
      });
    }, 10000);

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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-center items-center my-24">
            <div className="text-center my-4">Ethereum total difficulty</div>
            <BigNumber className="text-gray-500 animate-pulse">
              {totalDifficulty}
            </BigNumber>
            <BigNumber className="text-gray-700">
              {MERGE_TOTAL_DIFFICULTY}
            </BigNumber>
            <div className="text-center my-4">until the Merge</div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center my-24">
          <Countdown toDate={mergeTime} />
          <div className="text-center my-4">
            Estimated on{" "}
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
