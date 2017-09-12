import * as config from 'config';

export type Faucet = {
  rewardAddress: string
  delayBlocks: number
  minWalletAmount: number
  faucetReward: number
}

export type Base = {
  explorerLink: string
  fuligAddress: string
  nodeAddress: string
}
export type Event = {
  type: string
  title: string
  location: string
  uri: string
  date: string
  pdf: string
  ppt: string
}

export type Contribution = {
  title: string
  repository: string
  uri: string
  date: string
  authors: string[]
}

export type Project = {
  name: string
  description: string
  type: string
  stage: 'production' | 'development'
  repository: string
  license: 'MIT'
  authors: string[]
}

export type Member = {
  name: string
  img: string
  description: string
  link: string
  pool?: {
    url: string
    percentage: number
    timing: 'weekly'
  }
}

export type OutTx = {
  description: string
}

export const outTxs: OutTx[]        = config['outtxs'];
export const faucet: Faucet         = config['faucet'];
export const baseConfig: Base       = config['base'];
export const members: Member[]      = config['members'];
export const projects: Project[]    = config['projects'];
export const events: Event[]        = config['events'];
export const contributions: Event[] = config['contributions'];

export function getMemberObj(username: string): Member {
  return members.filter(m => m.name === username)[0];
}