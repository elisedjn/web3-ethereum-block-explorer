import React from 'react';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { Link } from 'react-router-dom';
import { bigNumberToString } from '../helpers';

const OneTransaction = ({ transaction }: { transaction: TransactionReceipt }) => {
  return (
    <div>
      <h3>General Info</h3>
      <div className='flex'>
        <div className='block-labels'>
          <div>Transaction Hash :</div>
          <div>Status :</div>
          <div>Block :</div>
        </div>
        <div className='block-info'>
          <div>{transaction.transactionHash}</div>
          <div>{transaction.status === 1 ? 'Success' : 'Reverted'}</div>
          <div>
            <Link to={`/block/${transaction.blockNumber}`}>
              {transaction.blockNumber}
            </Link>
          </div>
        </div>
      </div>

      <h3>Gas Info</h3>
      <div className='flex'>
        <div className='block-labels'>
          <div>Gas Used :</div>
          <div>Effective Gas Price :</div>
          <div>Cumulative Gas Used :</div>
        </div>
        <div className='block-info'>
          <div>{bigNumberToString(transaction.gasUsed)}</div>
          <div>{bigNumberToString(transaction.effectiveGasPrice)}</div>
          <div>{bigNumberToString(transaction.cumulativeGasUsed)}</div>
        </div>
      </div>
    </div>
  );
};

export default OneTransaction;
