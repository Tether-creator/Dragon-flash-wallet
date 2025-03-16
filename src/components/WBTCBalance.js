'use client';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import erc20ABI from '../utils/erc20ABI.json';

const WBTC_ADDRESS = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'; // WBTC on Ethereum Mainnet

export default function WBTCBalance({ walletAddress }) {
  const [balance, setBalance] = useState(null);
  const [symbol, setSymbol] = useState('WBTC');

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
        const contract = new ethers.Contract(WBTC_ADDRESS, erc20ABI, provider);
        const rawBalance = await contract.balanceOf(walletAddress);
        const decimals = await contract.decimals();
        const tokenSymbol = await contract.symbol();
        const formattedBalance = ethers.utils.formatUnits(rawBalance, decimals);
        setBalance(parseFloat(formattedBalance).toFixed(4));
        setSymbol(tokenSymbol);
      } catch (error) {
        console.error('Error fetching WBTC balance:', error);
      }
    };

    if (walletAddress) fetchBalance();
  }, [walletAddress]);

 return (
  <div style={{ marginTop: '20px', fontSize: '1.2rem' }}>
    <strong>WBTC Balance:</strong> {balance ? ${balance} ${symbol}' : 'Loading...'}
  </div>
);
  );
}
