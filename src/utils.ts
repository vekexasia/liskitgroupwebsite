import { APIClient } from 'lisk-elements';
import { baseConfig } from './models';
import * as isEmpty from 'is-empty';

export const liskApi = new APIClient(['https://liskworld.info',
  'https://wallet.mylisk.com',
  'https://liskwallet.punkrock.me',
  'https://lisk-login.vipertkd.com',
  'https://wallet.lisknode.io'], {});

const delegateCache = {

};
export async function cachedPubKeyToUserName(publicKey:string, dft:string) {
  if (isEmpty(delegateCache[publicKey])) {
    try {
      const res = await liskApi.delegates.get({publicKey});
      console.log(res);
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
      const res = await liskApi.accounts.get({address});
      addressCache[address] = res.data[0].publicKey;
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


