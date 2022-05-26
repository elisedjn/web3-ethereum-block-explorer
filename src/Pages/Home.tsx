import { Block } from '@ethersproject/abstract-provider';
import { providers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { getBlock } from '../API';
import Loading from '../Components/Loading';
import OneBlockCard from '../Components/OneBlockCard';
import { MAINNET_URL } from '../config';

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [latestBlocks, setLatestBlocks] = useState<Block[]>([]);
  const [newBlocks, setNewBlocks] = useState<boolean>(false);
  const [blockNbs, setBlockNbs] = useState<number[]>([]);

  const getLatestBlocks = async () => {
    try {
      setLoading(true);
      const newBlocks: Block[] = [];
      const newBlocksNb: number[] = [];
      const block1 = await getBlock('latest');
      if (!block1) return;
      newBlocks.push(block1);
      newBlocksNb.push(block1.number);
      const block2 = await getBlock(block1.parentHash);
      if (!block2) {
        setLatestBlocks(newBlocks);
        setBlockNbs(newBlocksNb);
        return;
      }
      newBlocks.push(block2);
      newBlocksNb.push(block2.number);
      const block3 = await getBlock(block2.parentHash ?? '');
      if (!block3) {
        setLatestBlocks(newBlocks);
        setBlockNbs(newBlocksNb);
        return;
      }
      newBlocks.push(block3);
      newBlocksNb.push(block3.number);
      setLatestBlocks(newBlocks);
      setBlockNbs(newBlocksNb);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const addANewBlock = async (blockNums: number[]) => {
    let promises: Promise<any>[] = [];
    blockNums.forEach((blockNum) => {
      promises.push(getBlock(blockNum));
    });
    const result = await Promise.all(promises);
    setLatestBlocks((Lb) => [...result.filter((b) => !!b), ...Lb]);
  };

  useEffect(() => {
    getLatestBlocks();
  }, []);

  useEffect(() => {
    let newBlocks = blockNbs
      .filter((b) => !latestBlocks.find((block) => block.number === b))
      .filter((b, i) => blockNbs.indexOf(b) === i);
    console.log('new Blocks are', newBlocks);
    addANewBlock(newBlocks);
  }, [blockNbs]);

  //add some debounced ???

  // const url = MAINNET_URL;
  // const provider = new providers.JsonRpcProvider(url);
  // provider.on('block', async (blockNum: number) => {
  //   console.log('new Block!');
  //   if (
  //     latestBlocks.length &&
  //     !latestBlocks.find((block) => block?.number === blockNum)
  //   ) {
  //     setNewBlocks(true);
  //     if (!blockNbs.includes(blockNum)) {
  //       setBlockNbs((bN) => [...bN, blockNum]);
  //     }
  //   }
  // });

  return (
    <div>
      <h2>Latest Blocks</h2>
      {!latestBlocks.length && (
        <>
          {loading ? (
            <Loading />
          ) : (
            <div>Something went wrong, please try again later</div>
          )}
        </>
      )}
      {newBlocks && <button onClick={() => {}}>Load new blocks!</button>}
      <div className='blocks-list'>
        {latestBlocks.map((block, index) => (
          <OneBlockCard key={index} block={block} />
        ))}
      </div>
    </div>
  );
};

export default Home;
