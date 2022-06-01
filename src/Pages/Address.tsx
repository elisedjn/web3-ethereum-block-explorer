import { BigNumber } from 'ethers';
import React, { useEffect, useState } from 'react';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { useParams } from 'react-router';
import { getAddressInfo } from '../API';
import Loading from '../Components/Loading';
import { Link } from 'react-router-dom';
import OneAddress from '../Components/OneAddress';

export type AddressType = {
  addressHash: string;
  balance: string;
  nonce: number;
  isContract: boolean;
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
    if (!addressNb) {
      setAddress(null);
    } else {
      getTheAddress();
    }
  }, [addressNb]);

  const getLink = () => {
    const input = document.getElementById('addrNbToFind') as HTMLInputElement;
    const value = input?.value;
    return value ? `/address/${value}` : '/address';
  };

  return (
    <div>
      <h1>
        {addressNb
          ? `${address?.isContract ? 'Contract' : 'Address'} ${addressNb}`
          : 'Look for an Address'}
      </h1>
      {!addressNb ? (
        <div className='search-block'>
          <label>
            Address
            <input type='text' id='addrNbToFind' />
          </label>
          <Link className='button-like' to={getLink()}>
            Search
          </Link>
        </div>
      ) : (
        !address && (
          <>
            {loading ? (
              <Loading />
            ) : (
              <div>Something went wrong, please try again later</div>
            )}
          </>
        )
      )}
      {!!address && <OneAddress address={address} />}
    </div>
  );
};

export default Address;
