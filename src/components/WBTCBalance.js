'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const WBTC_TOKEN_ADDRESS = '0x25C233589BF8497B6281be83fEd127933D82A9d5';
const WBTC_DECIMALS = 18;
const CHAINLINK_WBTC_USD = '0x5741306c21795FdCBb9b265Ea0255F499DFe515C';
const ABI = [
  // BalanceOf function for token
  'function balanceOf(address) view returns (uint256)',
  // Chainlink latestAnswer
  'function latestAnswer() view returns (int256)',
];

export default function WBTCBalance({ walletAddress }) {
  const [balance, setBalance] = useState(null);
  const [priceUSD, setPriceUSD] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      if (!walletAddress) return;

      const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org');

      const token = new ethers.Contract(WBTC_TOKEN_ADDRESS, ABI, provider);
      const feed = new ethers.Contract(CHAINLINK_WBTC_USD, ABI, provider);

      const rawBalance = await token.balanceOf(walletAddress);
      const formattedBalance = Number(ethers.utils.formatUnits(rawBalance, WBTC_DECIMALS));

      const latestPrice = await feed.latestAnswer();
      const price = Number(ethers.utils.formatUnits(latestPrice, 8)); // Chainlink feeds usually have 8 decimals

      setBalance(formattedBalance);
      setPriceUSD(price);
    };

    loadData();
  }, [walletAddress]);

  const totalValue = balance && priceUSD ? (balance * priceUSD).toFixed(2) : null;

  return (
    <div style={{ marginTop: '30px', background: '#111', padding: '20px', borderRadius: '8px', color: 'white' }}>
      <h2>WBTC Balance</h2>
      <p><strong>Wallet:</strong> {walletAddress}</p>
      <p><strong>Balance:</strong> {balance ?? 'Loading...'} WBTC</p>
      <p><strong>Price:</strong> ${priceUSD ?? 'Loading...'} USD</p>
      <p><strong>Total Value:</strong> ${totalValue ?? 'Loading...'} USD</p>
    </div>
  );
}
