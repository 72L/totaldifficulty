import Web3 from "web3";
import { BlockTransactionString } from "web3-eth"; // ex. package types
import { MERGE_TOTAL_DIFFICULTY } from "./constants";
import { leastSquares, Point } from "./regression";

const blocksPerDay = 6375;

export const predictMergeTime = async (
  web3: Web3,
  latestBlock: BlockTransactionString
) => {
  const values = await Promise.all(
    [1, 2, 3, 4, 5, 6, 7].map(async (tick): Promise<Point> => {
      const block = await web3.eth.getBlock(
        latestBlock.number - tick * blocksPerDay
      );
      return [+block.totalDifficulty, +block.timestamp * 1000];
    })
  );

  values.push([+latestBlock.totalDifficulty, +latestBlock.timestamp * 1000]);

  return new Date(leastSquares(values, +MERGE_TOTAL_DIFFICULTY));
};
