'use client';

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import ERC20ABI from '../utils/erc20ABI.json';

const WBTC_CONTRACT_ADDRESS = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'; // WBTC on Ethereum Mainnet
const WALLET_ADDRESS = '0x8731D535Cc4431B189FDda9411606928A2f23305'; // Your wallet

export default function WBTCBalance() {
  const [balance, setBalance] = useState(null);
  const [symbol, setSymbol] = useState('');

  useEffect(() => {
    async function fetchBalance() {
      try {
        const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/your_infura_project_id'); // or Alchemy/any RPC
        const contract = new ethers.Contract(WBTC_CONTRACT_ADDRESS, ERC20ABI, provider);

        const rawBalance = await contract.balanceOf(WALLET_ADDRESS);
        const decimals = await contract.decimals();
        const formattedBalance = ethers.utils.formatUnits(rawBalance, decimals);
        const tokenSymbol = await contract.symbol();

        setBalance(parseFloat(formattedBalance).toFixed(6));
        setSymbol(tokenSymbol);
      } catch (error) {
        console.error('Error fetching WBTC balance:', error);
      }
    }

    fetchBalance();
  }, []);

  return (
    <div style={{ marginTop: '20px', fontSize: '1.2rem' }}>
      <strong>WBTC Balance:</strong> {balance ? ${balance} ${symbol}';'Loading...'}
    </div>
  );
}
