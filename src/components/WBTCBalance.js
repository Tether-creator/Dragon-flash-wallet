'use client';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const WBTC_ABI = [
  "function balanceOf(address owner) view returns (uint)",
  "function symbol() view returns (string)"
];

const WBTC_ADDRESS = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"; // WBTC on Ethereum

export default function WBTCBalance({ walletAddress }) {
  const [balance, setBalance] = useState(null);
  const [symbol, setSymbol] = useState('WBTC');

  useEffect(() => {
    const fetchBalance = async () => {
      if (!walletAddress) return;

      const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_INFURA_KEY");
      const contract = new ethers.Contract(WBTC_ADDRESS, WBTC_ABI, provider);

      const rawBalance = await contract.balanceOf(walletAddress);
      const tokenSymbol = await contract.symbol();

      const formatted = ethers.utils.formatUnits(rawBalance, 8); // WBTC has 8 decimals
      setBalance(formatted);
      setSymbol(tokenSymbol);
    };

    fetchBalance();
  }, [walletAddress]);

  return (
    <div style={{ marginTop: '20px', fontSize: '1.2rem' }}>
      <strong>WBTC Balance:</strong> {balance ? ${balance} ${symbol} : 'Loading...'}
    </div>
  );
}
