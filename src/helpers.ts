import { BigNumber } from 'ethers';

export const bigNumberToString = (bigNb: Record<any, any>, readable = true) => {
  const stringNb = BigNumber.from(bigNb).toString();
  if (readable) {
    return readableNum(+stringNb);
  } else {
    return stringNb;
  }
};

export const readableNum = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};
