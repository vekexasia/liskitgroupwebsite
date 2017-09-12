import * as fireAdmin from 'firebase-admin';
import * as readline from 'readline';
import { dposOffline } from 'dpos-offline'
import { faucet } from '../src/models';
import { FaucetChecker } from '../src/faucetChecks';
import { liskApi } from '../src/utils';
import { LiskWallet } from 'dpos-offline/dist/es5/liskWallet';
import * as moment from 'moment';

fireAdmin.initializeApp({
  credential : fireAdmin.credential.cert(require(`./firebasekey.json`)),
  databaseURL: 'https://lisk-italian-group.firebaseio.com'
});

export function readLineFromStdin(question: string) {
  const rl = readline.createInterface({
    input   : process.stdin,
    output  : process.stdout,
    terminal: false
  });

  return new Promise<string>(resolve => {
    rl.question(question, line => {
      rl.close();
      resolve(line);
    });
  });
}

export async function nonInteractiveEnv(envVar: string, question: string) {
  if (typeof(process.env[envVar]) !== 'undefined') {
    return process.env[envVar];
  }
  return readLineFromStdin(question);
}

const queue: admin.database.DataSnapshot[] = [];


async function processLoop(w: LiskWallet) {
  console.log('processLoop started');
  const {fee} = await liskApi.blocks.getFee();
  const {broadhash, nethash} = await liskApi.blocks.getStatus();
  const {version} = await liskApi.peers.version();
  while (true) {
    if (queue.length > 0) {
      const item                           = queue.splice(0, 1)[0];
      const {address}: { address: string } = item.val();
      console.log(`Processing Payment for ${address}`);
      const checker = new FaucetChecker(liskApi, address);
      await item.ref.set(null); // Remove request!
      try {
        await checker.performChecks();
        // Se son qui tutto è andato bene
        const tx = (new dposOffline.transactions.SendTx())
          .set('amount', faucet.faucetReward * Math.pow(10, 8))
          .set('fee', fee)
          .set('timestamp', moment.utc().diff(new Date(Date.UTC(2016, 4, 24, 17, 0, 0, 0)), 'seconds'))
          .set('recipientId', address)
          .sign(w);

        await liskApi.transport({
          nethash,
          broadhash,
          version,
          port: 10
        }).postTransaction(tx);
        let ref = fireAdmin.database().ref('faucetResults').child(item.key);
        await ref.set({
          err: false,
          msg: `Reward is on its way`,
          txID: tx.id
        });

        await ref.set(null);
      } catch (e) {
        console.error(`${address} failure ${e.message}`);
        await fireAdmin.database().ref('faucetResults').child(item.key).set({
          err: true,
          msg: e.message
        });
      }
    }
    await awaiter(1000);
  }
}

async function worker() {
  const passphrase   = await nonInteractiveEnv('PASSPHRASE', 'Faucet reward passphrase? ')
  const faucetWallet = new dposOffline.wallets.LiskLikeWallet(passphrase);

  if (faucetWallet.address !== faucet.rewardAddress) {
    throw new Error('Passphrase is wrong!');
  }

  // Start process loop
  fireAdmin.database().ref('faucetRequests')
    .on('child_added', (ds: admin.database.DataSnapshot) => {
      queue.push(ds);
    });

  await processLoop(faucetWallet);
}


const awaiter = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


worker()
  .then(() => process.exit(1))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });