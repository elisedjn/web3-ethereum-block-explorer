import { providers, Wallet, utils } from 'ethers';
import { MAINNET_URL } from '../config';

const url = MAINNET_URL;
const provider = new providers.JsonRpcProvider(url);
const etherscanProvider = new providers.EtherscanProvider();

export const getBlock = async (blockNb: string | number) => {
  try {
    const block = await provider.getBlock(blockNb);
    return block;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getBlockWithTx = async (blockNb: string | number) => {
  try {
    const block = await provider.getBlockWithTransactions(blockNb);
    return block;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAddressInfo = async (addressNb: string) => {
  try {
    //Check the address
    const addressHash = await utils.getAddress(addressNb);
    const isAddress = await utils.isAddress(addressHash);
    if (!isAddress) {
      return { success: false, error: 'Invalid Address' };
    }

    console.log('is an address');

    //Get the balance
    const balance = await provider.getBalance(addressHash);
    console.log('balance', balance);

    //Get the nonce
    const nonce = await provider.getTransactionCount(addressHash);
    console.log('nonce', nonce);

    const code = await provider.getCode(addressHash);

    return {
      success: true,
      data: {
        addressHash,
        balance: utils.formatEther(balance),
        nonce,
        isContract: code !== '0x0',
      },
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getTransactionReceipt = async (tXHash: string) => {
  try {
    const tx = await provider.getTransactionReceipt(tXHash);
    return tx;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTransaction = async (tXHash: string) => {
  try {
    const tx = await provider.getTransaction(tXHash);
    return tx;
  } catch (error) {
    console.log(error);
    return null;
  }
};
