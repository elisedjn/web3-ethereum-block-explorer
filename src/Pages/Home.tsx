import { Block } from '@ethersproject/abstract-provider';
import { providers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { getBlock } from '../API';
import OneBlockCard from '../Components/OneBlockCard';
import { MAINNET_URL } from '../config';

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [latestBlocks, setLatestBlocks] = useState<Block[]>([]);
  const [newBlocks, setNewBlocks] = useState<boolean>(false);

  const getLatestBlocks = async () => {
    try {
      setLoading(true);
      const newBlocks: Block[] = [];
      const block1 = await getBlock('latest');
      if (!block1) return;
      newBlocks.push(block1);
      const block2 = await getBlock(block1.parentHash);
      if (!block2) {
        setLatestBlocks(newBlocks);
        return;
      }
      newBlocks.push(block2);
      const block3 = await getBlock(block2.parentHash ?? '');
      if (!block3) {
        setLatestBlocks(newBlocks);
        return;
      }
      newBlocks.push(block3);
      setLatestBlocks(newBlocks);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getLatestBlocks();
  }, []);

  const url = MAINNET_URL;
  const provider = new providers.JsonRpcProvider(url);
  provider.on('block', async (blockNum) => {
    if (
      latestBlocks.length &&
      !newBlocks &&
      !latestBlocks.find((block) => block?.number === blockNum)
    ) {
      setNewBlocks(true);
    }
  });

  return (
    <div>
      <h2>Latest Blocks</h2>
      {!latestBlocks.length && (
        <>
          {loading ? (
            <div>Loading... Please wait</div>
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
