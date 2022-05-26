import React from 'react';
import { Block } from '@ethersproject/abstract-provider';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import '../App.css';

const OneBlockCard = ({ block }: { block: Block }) => {
  const date = new Date(block.timestamp * 1000);
  return (
    <div className='one-block-card'>
      <h4>
        Block <Link to={`/block/${block.number}`}>{block.number}</Link>
      </h4>
      <div>
        <Moment fromNow>{date}</Moment>
        <p>{block.transactions.length} transactions</p>
        <p>
          Miner : <Link to={`/address/${block.miner}`}>{block.miner}</Link>
        </p>
      </div>
    </div>
  );
};

export default OneBlockCard;
