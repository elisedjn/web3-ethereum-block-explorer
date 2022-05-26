import { BigNumber } from 'ethers';
import React, { useEffect, useState } from 'react';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { useParams } from 'react-router';
import { getAddressInfo } from '../API';

export type AddressType = {
  addressHash: string;
  balance: BigNumber;
  nonce: number;
  history: TransactionResponse[];
  price: number;
};

const Address = () => {
  const { addressNb } = useParams();
  const [address, setAddress] = useState<AddressType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getTheAddress = async () => {
    try {
      setLoading(true);
      const addressInfo = await getAddressInfo(addressNb ?? '');
      console.log('oops');
      if (addressInfo.success && addressInfo.data) {
        console.log('hello');
        setAddress(addressInfo.data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTheAddress();
  }, []);

  const balance = address?.balance ? BigNumber.from(address.balance).toString() : 0;

  console.log({ address });
  return (
    <div>
      <h1>Address {addressNb}</h1>
      <div>
        <p>Balance : {balance}</p>
      </div>
    </div>
  );
};

export default Address;
