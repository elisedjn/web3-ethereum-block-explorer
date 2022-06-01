import { Block } from '@ethersproject/abstract-provider';
import React, { InputHTMLAttributes, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getBlock } from '../API';
import Loading from '../Components/Loading';
import OneFullBlock from '../Components/OneFullBlock';

const BlockPage = () => {
  const { blockNb } = useParams();
  const [block, setBlock] = useState<Block | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getTheBlock = async () => {
    try {
      if (!blockNb) return;
      setLoading(true);
      const block = await getBlock(+blockNb);
      setBlock(block);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!blockNb) {
      setBlock(null);
    } else {
      getTheBlock();
    }
  }, [blockNb]);

  const getLink = () => {
    const input = document.getElementById('blockNbToFind') as HTMLInputElement;
    const value = input?.value;
    return value ? `/block/${value}` : '/block';
  };

  return (
    <div>
      <h1>{blockNb ? `Block ${blockNb}` : 'Look for a Block'}</h1>
      {!blockNb ? (
        <div className='search-block'>
          <label>
            Block number
            <input type='text' id='blockNbToFind' />
          </label>
          <Link className='button-like' to={getLink()}>
            Search
          </Link>
        </div>
      ) : (
        !block && (
          <>
            {loading ? (
              <Loading />
            ) : (
              <div>Something went wrong, please try again later</div>
            )}
          </>
        )
      )}
      {!!block && <OneFullBlock block={block} />}
    </div>
  );
};

export default BlockPage;
