import { providers, Wallet, utils } from 'ethers';
import { MAINNET_URL } from '../config';

const url = MAINNET_URL;
const provider = new providers.JsonRpcProvider(url);
const etherscanProvider = new providers.EtherscanProvider();

export const getBlock = async (blockNb: string) => {
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

    //Get the balance
    const balance = await provider.getBalance(addressHash);

    //Get the nonce
    const nonce = await provider.getTransactionCount(addressHash);

    //Get the history
    const history = await etherscanProvider.getHistory(addressHash);

    //Get the price for 1 ETH
    const price = await provider.getEtherPrice();

    return { success: true, data: { addressHash, balance, nonce, history, price } };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
