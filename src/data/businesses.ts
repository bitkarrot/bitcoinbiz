import type { Business } from '../types/business';

export const businesses: Business[] = [
  {
    id: '1',
    name: 'Strike',
    website: 'https://strike.me',
    country: 'United States',
    countryCode: 'US',
    description: 'Lightning-powered payments app that lets you send money instantly, globally, for free.',
    lightning: true,
    category: 'Payment App',
    image: 'https://strike.me/favicon.ico'
  },
  {
    id: '2',
    name: 'Bitrefill',
    website: 'https://bitrefill.com',
    country: 'Sweden',
    countryCode: 'SE',
    description: 'Buy gift cards and mobile refills with Bitcoin and Lightning.',
    lightning: true,
    category: 'Gift Cards',
    image: 'https://bitrefill.com/favicon.ico'
  },
  {
    id: '3',
    name: 'Casa',
    website: 'https://casa.io',
    country: 'United States',
    countryCode: 'US',
    description: 'Self-custody Bitcoin security solutions for individuals and institutions.',
    lightning: false,
    category: 'Security',
    image: 'https://casa.io/favicon.ico'
  },
  {
    id: '4',
    name: 'River Financial',
    website: 'https://river.com',
    country: 'United States',
    countryCode: 'US',
    description: 'Bitcoin-only financial services with Lightning integration.',
    lightning: true,
    category: 'Exchange',
    image: 'https://river.com/favicon.ico'
  },
  {
    id: '5',
    name: 'Fold',
    website: 'https://foldapp.com',
    country: 'United States',
    countryCode: 'US',
    description: 'Earn Bitcoin rewards on everyday purchases with the Fold debit card.',
    lightning: true,
    category: 'Rewards',
    image: 'https://foldapp.com/favicon.ico'
  },
  {
    id: '6',
    name: 'Coinkite',
    website: 'https://coinkite.com',
    country: 'Canada',
    countryCode: 'CA',
    description: 'Hardware wallets and Bitcoin security solutions including Coldcard.',
    lightning: false,
    category: 'Hardware',
    image: 'https://coinkite.com/favicon.ico'
  },
  {
    id: '7',
    name: 'Breez',
    website: 'https://breez.technology',
    country: 'Israel',
    countryCode: 'IL',
    description: 'Lightning-native mobile wallet and point-of-sale solutions.',
    lightning: true,
    category: 'Wallet',
    image: 'https://breez.technology/favicon.ico'
  },
  {
    id: '8',
    name: 'BTCPay Server',
    website: 'https://btcpayserver.org',
    country: 'Global',
    countryCode: 'GLOBAL',
    description: 'Open-source Bitcoin payment processor with Lightning support.',
    lightning: true,
    category: 'Payment Processor',
    image: 'https://btcpayserver.org/favicon.ico'
  },
  {
    id: '9',
    name: 'Blockstream',
    website: 'https://blockstream.com',
    country: 'Canada',
    countryCode: 'CA',
    description: 'Bitcoin infrastructure company developing Lightning and Liquid networks.',
    lightning: true,
    category: 'Infrastructure',
    image: 'https://blockstream.com/favicon.ico'
  },
  {
    id: '10',
    name: 'Muun Wallet',
    website: 'https://muun.com',
    country: 'Argentina',
    countryCode: 'AR',
    description: 'Self-custodial Bitcoin wallet with Lightning Network support.',
    lightning: true,
    category: 'Wallet',
    image: 'https://muun.com/favicon.ico'
  }
];

export const countries = Array.from(new Set(businesses.map(b => b.country))).sort();
