'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const WBTC_ABI = [
  'function balanceOf(address) view returns (uint256)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
];

const WBTC_ADDRESS = '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c'; // WBTC on BSC
const walletAddress = '0x8731D535Cc4431B189FDda9411606928A2f23305';

export default function WBTCBalance() {
  const [balance, setBalance] = useState(null);
  const [symbol, setSymbol] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
        const contract = new ethers.Contract(WBTC_ADDRESS, WBTC_ABI, provider);
        const [rawBalance, decimals, tokenSymbol] = await Promise.all([
          contract.balanceOf(walletAddress),
          contract.decimals(),
          contract.symbol()
        ]);

        const formatted = ethers.utils.formatUnits(rawBalance, decimals);
        setBalance(formatted);
        setSymbol(tokenSymbol);
      } catch (error) {
        console.error('Failed to fetch balance:', error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div style={{ marginTop: '20px', fontSize: '1.2rem' }}>
     <strong>WBTC Balance:</strong> {balance ? ${balance} ${symbol}' : ',Loading...'}
     <strong>WBTC Balance:</strong> {balance ? ${balance} ${symbol}' : ',Loading...'}
    </div>
  );
}
