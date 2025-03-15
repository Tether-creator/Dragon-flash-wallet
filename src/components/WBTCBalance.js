'use client';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import ERC20ABI from '../utils/erc20ABI.json';

const WBTCBalance = ({ walletAddress }) => {
  const [balance, setBalance] = useState(null);
  const [symbol, setSymbol] = useState('');

  const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
  const WBTCAddress = '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c'; // WBTC on BSC

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const contract = new ethers.Contract(WBTCAddress, ERC20ABI, provider);
        const rawBalance = await contract.balanceOf(walletAddress);
        const decimals = await contract.decimals();
        const tokenSymbol = await contract.symbol();
        const formattedBalance = parseFloat(ethers.utils.formatUnits(rawBalance, decimals)).toFixed(6);

        setBalance(formattedBalance);
        setSymbol(tokenSymbol);
      } catch (error) {
        console.error('Error fetching WBTC balance:', error);
      }
    };

    if (walletAddress) {
      fetchBalance();
    }
  }, [walletAddress]);

  return (
    <div style={{ marginTop: '20px', fontSize: '1.2rem' }}>
      <strong>WBTC Balance:</strong> {balance ? ${balance} ${symbol} : 'Loading...'}
    </div>
  );
};

export default WBTCBalance;
