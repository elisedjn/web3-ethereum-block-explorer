import React from 'react';
import { readableNum } from '../helpers';
import { AddressType } from '../Pages/Address';

const OneAddress = ({ address }: { address: AddressType }) => {
  return (
    <div>
      <h3>General Info</h3>
      <div className='flex'>
        <div className='block-labels'>
          <div>Balance :</div>
          <div>{address.isContract ? 'Transactions' : 'Nonce'} :</div>
        </div>
        <div className='block-info'>
          <div>{address.balance} ETH</div>
          <div>{readableNum(address.nonce)}</div>
        </div>
      </div>
    </div>
  );
};

export default OneAddress;
