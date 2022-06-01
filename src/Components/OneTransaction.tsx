import React from 'react';
import {
  TransactionReceipt,
  TransactionResponse,
} from '@ethersproject/abstract-provider';
import { Link } from 'react-router-dom';
import { bigNumberToString } from '../helpers';
import { utils } from 'ethers';

const OneTransaction = ({
  txReceipt,
  transaction,
}: {
  txReceipt: TransactionReceipt | null;
  transaction: TransactionResponse;
}) => {
  return (
    <div>
      <h3>General Info</h3>
      <div className='flex'>
        <div className='block-labels'>
          <div>Transaction Hash :</div>
          <div>From :</div>
          {!!transaction.to ? <div>To :</div> : <div>Interacted With (To)</div>}
          <div>Value :</div>
          <div>Status :</div>
          <div>Block :</div>
        </div>
        <div className='block-info'>
          <div className={!txReceipt?.transactionHash ? 'processing' : ''}>
            {txReceipt?.transactionHash ?? 'Not available yet'}
          </div>
          <div>
            <Link to={`/address/${transaction.from}`}>{transaction.from}</Link>
          </div>
          <div>
            {!txReceipt?.contractAddress ? (
              <Link to={`/address/${transaction.to}`}>{transaction.to}</Link>
            ) : (
              <Link to={`/address/${txReceipt.contractAddress}`}>
                {txReceipt.contractAddress}
              </Link>
            )}
          </div>
          <div>{utils.formatEther(transaction.value)} ETH</div>
          <div
            className={
              txReceipt ? (txReceipt.status === 1 ? 'success' : 'error') : 'processing'
            }
          >
            {txReceipt
              ? txReceipt.status === 1
                ? '✅ Success'
                : '❌ Reverted'
              : '⏱ Processing'}
          </div>
          <div>
            {transaction.blockNumber ? (
              <>
                <Link to={`/block/${transaction.blockNumber}`}>
                  {transaction.blockNumber}
                </Link>{' '}
                <span className='processing small-text'>
                  ({transaction.confirmations} Block Confirmations)
                </span>
              </>
            ) : (
              'Not available yet'
            )}
          </div>
        </div>
      </div>

      <h3>Gas Info</h3>
      <div className='flex'>
        <div className='block-labels'>
          <div>Gas Limit :</div>
          {!!txReceipt && (
            <>
              <div>Gas Used :</div>
              <div>Effective Gas Price :</div>
              <div>Cumulative Gas Used :</div>
            </>
          )}
        </div>
        <div className='block-info'>
          <div>{bigNumberToString(transaction.gasLimit)}</div>
          {!!txReceipt && (
            <>
              <div>{bigNumberToString(txReceipt.gasUsed)}</div>
              <div>{utils.formatEther(txReceipt.effectiveGasPrice)} ETH</div>
              <div>{bigNumberToString(txReceipt.cumulativeGasUsed)}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OneTransaction;
