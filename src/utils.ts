import {rise} from 'risejs';
import {baseConfig} from './models';
import * as isEmpty from 'is-empty';

rise.nodeAddress = baseConfig.nodeAddress;

export const liskApi = rise;

const delegateCache = {

};
export async function cachedPubKeyToUserName(publicKey:string, dft:string) {
  if (isEmpty(delegateCache[publicKey])) {
    try {
      const res = await liskApi.delegates.getList({publicKey} as any) as any;
      delegateCache[publicKey] = res.data[0].username;

    } catch (e) {
      return dft;
    }
  }
  return delegateCache[publicKey];
}

const addressCache = {

};
export async function cachedAddressToUserName(address:string, dft:string) {
  if (isEmpty(addressCache[address])) {
    try {
      const res = await liskApi.accounts.getAccount(address);
      addressCache[address] = res.account.publicKey;
    } catch (e) {
      return dft;
    }
  }
  return cachedPubKeyToUserName(addressCache[address], dft);
}

export const viewUtils = {
  explorerTxLink(txId:string) {
    return `${baseConfig.explorerLink}/tx/${txId}`
  },
  explorerAddressLink(txId:string) {
    return `${baseConfig.explorerLink}/address/${txId}`
  },
  explorerDelegateLink(delegateAddress: string) {
    return `${baseConfig.explorerLink}/delegate/${delegateAddress}`;
  }
};


