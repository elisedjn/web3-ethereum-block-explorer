import React, { useEffect, useState } from 'react';
import { BlockWithTransactions } from '@ethersproject/abstract-provider';
import { Link, useParams } from 'react-router-dom';
import { getBlockWithTx } from '../API';
import Loading from '../Components/Loading';

const AllTransactions = () => {
  const { blockNb } = useParams();
  const [blockWithTxn, setBlockWithTxn] = useState<BlockWithTransactions | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getTheBlock = async () => {
    try {
      if (!blockNb) return;
      setLoading(true);
      const block = await getBlockWithTx(+blockNb);
      setBlockWithTxn(block);
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
      <h1>
        Transactions from Block <Link to={`/block/${blockNb}`}>#{blockNb}</Link>
      </h1>
      {!blockWithTxn && (
        <>
          {loading ? (
            <Loading />
          ) : (
            <div>Something went wrong, please try again later</div>
          )}
        </>
      )}

      {!!blockWithTxn &&
        blockWithTxn?.transactions.map((tx, index) => (
          <div>
            Transaction hash : <Link to={`/tx/${tx.hash}`}>{tx.hash}</Link>
          </div>
        ))}
    </div>
  );
};

export default AllTransactions;
