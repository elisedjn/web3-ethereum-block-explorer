import { BlockWithTransactions } from '@ethersproject/abstract-provider';
import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { bigNumberToString } from '../helpers';
import './FullBlock.css';

const OneFullBlock = ({ block }: { block: BlockWithTransactions }) => {
  const date = new Date(block.timestamp * 1000);

  return (
    <div>
      <h3>General Info</h3>
      <div className='flex'>
        <div className='block-labels'>
          <div>Block number :</div>
          <div>Timestamp :</div>
          <div>Transactions :</div>
        </div>
        <div className='block-info'>
          <div>{block.number}</div>
          <Moment parse='YYYY-MM-DD HH:mm'>{date}</Moment>
          <div>
            {block.transactions.length} transactions{' '}
            <Link to={`/txsPerBlock/${block.number}`}>See details</Link>
          </div>
        </div>
      </div>

      <h3>Gas</h3>
      <div className='flex'>
        <div className='block-labels'>
          <div>Gas Limit :</div>
          <div>Gas Used :</div>
          {!!block.baseFeePerGas && <div>Base Fee per Gas :</div>}
        </div>
        <div className='block-info'>
          <div>{bigNumberToString(block.gasLimit)}</div>
          <div>{bigNumberToString(block.gasUsed)}</div>
          {!!block.baseFeePerGas && <div>{bigNumberToString(block.baseFeePerGas)}</div>}
        </div>
      </div>

      <h3>Mining</h3>
      <div className='flex'>
        <div className='block-labels'>
          <div>Miner :</div>
          <div>Difficulty :</div>
          <div>Nonce :</div>
          <div>Hash :</div>
          <div>Parent Hash :</div>
        </div>
        <div className='block-info'>
          <div>
            <Link to={`/address/${block.miner}`}>{block.miner}</Link>
          </div>
          <div>{bigNumberToString(block._difficulty)}</div>
          <div>{block.nonce}</div>
          <div>{block.hash}</div>
          <div>{block.parentHash}</div>
        </div>
      </div>
    </div>
  );
};

export default OneFullBlock;
