import {
  TransactionReceipt,
  TransactionResponse,
} from '@ethersproject/abstract-provider';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTransaction, getTransactionReceipt } from '../API';
import Loading from '../Components/Loading';
import OneTransaction from '../Components/OneTransaction';

const Transaction = () => {
  const { txNb } = useParams();
  const [transaction, setTransaction] = useState<TransactionResponse | null>(null);
  const [txReceipt, setTxReceipt] = useState<TransactionReceipt | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getTheTx = async () => {
    try {
      if (!txNb) return;
      setLoading(true);
      const tx = await getTransaction(txNb);
      setTransaction(tx);
      const receipt = await getTransactionReceipt(txNb);
      setTxReceipt(receipt);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!txNb) {
      setTransaction(null);
      setTxReceipt(null);
    } else {
      getTheTx();
    }
  }, [txNb]);

  const getLink = () => {
    const input = document.getElementById('txNbToFind') as HTMLInputElement;
    const value = input?.value;
    return value ? `/tx/${value}` : '/tx';
  };

  return (
    <div>
      <h1>{txNb ? 'Transaction' : 'Look for a Transaction'}</h1>
      {!txNb ? (
        <div className='search-block'>
          <label>
            Transaction hash
            <input type='text' id='txNbToFind' />
          </label>
          <Link className='button-like' to={getLink()}>
            Search
          </Link>
        </div>
      ) : (
        !transaction && (
          <>
            {loading ? (
              <Loading />
            ) : (
              <div>Something went wrong, please try again later</div>
            )}
          </>
        )
      )}
      {!!transaction && (
        <OneTransaction transaction={transaction} txReceipt={txReceipt} />
      )}
    </div>
  );
};

export default Transaction;
