import { BlockWithTransactions } from '@ethersproject/abstract-provider';
import React, { useEffect, useState } from 'react';
import { getBlock } from '../API';
import OneBlock from '../Components/OneBlock';

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [latestBlock, setLatestBlock] = useState<BlockWithTransactions | null>(null);

  const getLatestBlock = async () => {
    try {
      setLoading(true);
      const block = await getBlock('latest');
      setLatestBlock(block);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getLatestBlock();
  }, []);
  return (
    <div>
      <h1>Ethereum Block Explorer</h1>
      <div>
        <h2>Latest Block</h2>
        {!latestBlock && (
          <>
            {loading ? (
              <div>Loading... Please wait</div>
            ) : (
              <div>Something went wrong, please try again later</div>
            )}
          </>
        )}
        {!!latestBlock && <OneBlock block={latestBlock} />}
      </div>
    </div>
  );
};

export default Home;
