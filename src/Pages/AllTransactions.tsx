import React, { useEffect, useState } from 'react';
import { BlockWithTransactions } from '@ethersproject/abstract-provider';
import { Link, useParams } from 'react-router-dom';
import { getBlockWithTx } from '../API';
import Loading from '../Components/Loading';
import { utils } from 'ethers';

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

      {!!blockWithTxn && (
        <table className='tx-table'>
          <tr className='header-line'>
            <td>Txn Hash</td>
            <td>From</td>
            <td> </td>
            <td>To</td>
            <td>Value</td>
          </tr>
          {blockWithTxn?.transactions.map((tx, index) => (
            <tr key={index}>
              <td>
                <Link to={`/tx/${tx.hash}`} className='truncate-ellipsis'>
                  {tx.hash}
                </Link>
              </td>
              <td>
                <Link to={`/address/${tx.from}`} className='truncate-ellipsis'>
                  {tx.from}
                </Link>
              </td>
              <td className='processing'> {'➡ '} </td>
              <td>
                <Link to={`/address/${tx.to}`} className='truncate-ellipsis'>
                  {tx.to}
                </Link>
              </td>
              <td>{utils.formatEther(tx.value)} ETH</td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
};

export default AllTransactions;
