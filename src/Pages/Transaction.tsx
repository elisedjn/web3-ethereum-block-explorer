import { TransactionReceipt } from '@ethersproject/abstract-provider';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTransactionReceipt } from '../API';
import Loading from '../Components/Loading';
import OneTransaction from '../Components/OneTransaction';

const Transaction = () => {
  const { txNb } = useParams();
  const [transaction, setTransaction] = useState<TransactionReceipt | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const getTheTx = async () => {
    try {
      if (!txNb) return;
      setLoading(true);
      const tx = await getTransactionReceipt(txNb);
      setTransaction(tx);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getTheTx();
  }, [txNb]);

  return (
    <div>
      <h1>Transaction</h1>
      {!transaction && (
        <>
          {loading ? (
            <Loading />
          ) : (
            <div>Something went wrong, please try again later</div>
          )}
        </>
      )}
      {!!transaction && <OneTransaction transaction={transaction} />}
    </div>
  );
};

export default Transaction;
