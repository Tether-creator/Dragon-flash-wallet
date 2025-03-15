'use client';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import WBTCABI from '../utils/WBTC_ABI.json';
import AggregatorV3InterfaceABI from '../utils/AggregatorV3InterfaceABI.json';

const WBTC_CONTRACT_ADDRESS = '0x25C233589BF8497B6281be83fEd127933D82A9d5';
const PRICE_FEED_ADDRESS = '0x5741306c21795FdCBb9b265Ea0255F499DFe515C';
const WALLET_ADDRESS = '0x8731D535Cc4431B189FDda9411606928A2f23305';

export default function WBTCBalance() {
  const [balance, setBalance] = useState(null);
  const [symbol, setSymbol] = useState('WBTC');

  useEffect(() => {
    const fetchBalanceAndSymbol = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org');
        const contract = new ethers.Contract(WBTC_CONTRACT_ADDRESS, WBTCABI, provider);
        const rawBalance = await contract.balanceOf(WALLET_ADDRESS);
        const decimals = await contract.decimals();
        const formattedBalance = ethers.utils.formatUnits(rawBalance, decimals);
        setBalance(parseFloat(formattedBalance).toFixed(4));
        const tokenSymbol = await contract.symbol();
        setSymbol(tokenSymbol);
      } catch (err) {
        console.error('Error fetching balance:', err);
      }
    };

    fetchBalanceAndSymbol();
  }, []);

  return (
    <div style={{ marginTop: '20px', fontSize: '1.2rem' }}>
      <strong>WBTC Balance:</strong> {balance ? ${balance} ${symbol} : 'Loading...'}
    </div>
  );
} 
 
