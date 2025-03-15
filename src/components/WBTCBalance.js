'use client';

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import AggregatorV3InterfaceABI from '../utils/AggregatorV3InterfaceABI.json';

const WBTCBalance = ({ walletAddress }) => {
  const [balance, setBalance] = useState(null);
  const [symbol, setSymbol] = useState('WBTC');

  const wbtcContractAddress = '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c'; // WBTC on BSC
  const chainlinkWBTCUSD = '0x5741306c21795FdCBb9b265Ea0255F499DFe515C'; // Chainlink WBTC/USD on BSC

  const erc20ABI = [
    'function balanceOf(address) view returns (uint)',
    'function decimals() view returns (uint8)',
    'function symbol() view returns (string)'
  ];

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
        const tokenContract = new ethers.Contract(wbtcContractAddress, erc20ABI, provider);
        const oracleContract = new ethers.Contract(chainlinkWBTCUSD, AggregatorV3InterfaceABI, provider);

        const [rawBalance, decimals, tokenSymbol, roundData] = await Promise.all([
          tokenContract.balanceOf(walletAddress),
          tokenContract.decimals(),
          tokenContract.symbol(),
          oracleContract.latestRoundData()
        ]);

        const formatted = ethers.utils.formatUnits(rawBalance, decimals);
        const price = parseFloat(roundData.answer) / 1e8;

        const balanceInUSD = (parseFloat(formatted) * price).toFixed(2);
        setSymbol(tokenSymbol);
        setBalance(balanceInUSD);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, [walletAddress]);

  return (
    <div style={{ marginTop: '20px', fontSize: '1.2rem' }}>
      <strong>WBTC Balance:</strong>{' '}
      {balance ? ${balance} USD (${symbol}) : 'Loading...'}
    </div>
  );
};

export default WBTCBalance;
