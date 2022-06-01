import { Block } from '@ethersproject/abstract-provider';
import React, { useEffect, useState } from 'react';
import { getBlock } from '../API';
import Loading from '../Components/Loading';
import OneBlockCard from '../Components/OneBlockCard';

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [latestBlocks, setLatestBlocks] = useState<Block[]>([]);

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
        return;
      }
      newBlocks.push(block2);
      newBlocksNb.push(block2.number);
      const block3 = await getBlock(block2.parentHash ?? '');
      if (!block3) {
        setLatestBlocks(newBlocks);
        return;
      }
      newBlocks.push(block3);
      newBlocksNb.push(block3.number);
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
      <div className='blocks-list'>
        {latestBlocks.map((block, index) => (
          <OneBlockCard key={index} block={block} />
        ))}
      </div>
    </div>
  );
};

export default Home;
