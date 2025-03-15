'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const wbtcAddress = '0x25C233589BF8497B6281be83fEd127933D82A9d5';
const wbtcAbi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

const walletAddress = '0x8731D535Cc4431B189FDda9411606928A2f23305';

export default function WBTCBalance() {
  const [balance, setBalance] = useState(null);
  const [symbol, setSymbol] = useState('');

  useEffect(() => {
    const loadBalance = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
        const tokenContract = new ethers.Contract(wbtcAddress, wbtcAbi, provider);
        const bal = await tokenContract.balanceOf(walletAddress);
        const decimals = await tokenContract.decimals();
        const symbol = await tokenContract.symbol();
        const formatted = ethers.utils.formatUnits(bal, decimals);
        setBalance(formatted);
        setSymbol(symbol);
      } catch (err) {
        console.error('Failed to fetch balance:', err);
      }
    };

    loadBalance();
  }, []);

  return (
    <div style={{ marginTop: '20px', fontSize: '1.2rem' }}>
      <strong>WBTC Balance:</strong> {balance ? ${balance} ${symbol} : 'Loading...'}
    </div>
  );
}

  
 
