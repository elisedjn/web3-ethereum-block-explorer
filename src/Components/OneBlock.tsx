import { BlockWithTransactions } from '@ethersproject/abstract-provider';
import { BigNumber } from 'ethers';
import React from 'react';

const OneBlock = ({ block }: { block: BlockWithTransactions }) => {
  const bigNumberToString = (bigNb: Record<any, any>) => {
    return BigNumber.from(bigNb).toString();
  };
  return (
    <div>
      <h3>General Info</h3>
      <div>
        <span>Block number :</span> <span>{block.number}</span>
      </div>
      <div>
        <span>Timestamp :</span> <span>{block.timestamp}</span>
      </div>
      <div>
        <span>Transactions :</span> <span>{block.transactions.length}</span>
      </div>

      <h3>Gas</h3>
      <div>
        <span>Gas Limit :</span> <span>{bigNumberToString(block.gasLimit)}</span>
      </div>
      <div>
        <span>Gas Used :</span> <span>{bigNumberToString(block.gasUsed)}</span>
      </div>
      {!!block.baseFeePerGas && (
        <div>
          <span>Base Fee per Gas :</span>{' '}
          <span>{bigNumberToString(block.baseFeePerGas)}</span>
        </div>
      )}

      <h3>Mining</h3>
      <div>
        <span>Miner :</span> <span>{block.miner}</span>
      </div>
      <div>
        <span>Difficulty :</span> <span>{bigNumberToString(block._difficulty)}</span>
      </div>
      <div>
        <span>Nonce :</span> <span>{block.nonce}</span>
      </div>
      <div>
        <span>Hash :</span> <span>{block.hash}</span>
      </div>
      <div>
        <span>Parent Hash :</span> <span>{block.parentHash}</span>
      </div>
    </div>
  );
};

export default OneBlock;
