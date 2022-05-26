import { BlockWithTransactions } from '@ethersproject/abstract-provider';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getBlock } from '../API';
import OneBlock from '../Components/OneBlock';

const BlockPage = () => {
  const { blockNb } = useParams();
  const [block, setBlock] = useState<BlockWithTransactions | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getTheBlock = async () => {
    try {
      if (!blockNb) return;
      setLoading(true);
      const block = await getBlock(blockNb);
      setBlock(block);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTheBlock();
  }, [blockNb]);

  return (
    <div>
      <h1>Block {blockNb}</h1>
      {!block && (
        <>
          {loading ? (
            <div>Loading... Please wait</div>
          ) : (
            <div>Something went wrong, please try again later</div>
          )}
        </>
      )}
      {!!block && <OneBlock block={block} />}
    </div>
  );
};

export default BlockPage;
