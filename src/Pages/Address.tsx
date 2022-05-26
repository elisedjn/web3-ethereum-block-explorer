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
      if (addressInfo.success && addressInfo.data) {
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
  }, [addressNb]);

  return (
    <div>
      <h1>Address {addressNb}</h1>
      <div></div>
    </div>
  );
};

export default Address;
