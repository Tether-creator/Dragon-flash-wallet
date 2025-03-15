'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const WBTC_CONTRACT = "0x25C233589BF8497B6281be83fEd127933D82A9d5";
const WALLET = "0x8731D535Cc4431B189FDda9411606928A2f23305";
const CHAINLINK_PRICE_FEED = "0x5741306c21795FdCBb9b265Ea0255F499DFe515C";

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

const PRICE_FEED_ABI = [
  "function latestRoundData() external view returns (uint80, int256, uint256, uint256, uint80)"
];

export default function WBTCBalance() {
  const [balance, setBalance] = useState(null);
  const [price, setPrice] = useState(null);
  const [symbol, setSymbol] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
        const token = new ethers.Contract(WBTC_CONTRACT, ERC20_ABI, provider);
        const priceFeed = new ethers.Contract(CHAINLINK_PRICE_FEED, PRICE_FEED_ABI, provider);

        const [rawBalance, decimals, tokenSymbol] = await Promise.all([
          token.balanceOf(WALLET),
          token.decimals(),
          token.symbol()
        ]);

        const balanceFormatted = ethers.utils.formatUnits(rawBalance, decimals);
        const [, rawPrice] = await priceFeed.latestRoundData();
        const tokenPrice = Number(rawPrice) / 1e8; // Chainlink price feeds are 8 decimals

        setBalance(balanceFormatted);
        setSymbol(tokenSymbol);
        setPrice(tokenPrice);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ marginTop: '20px', background: '#1e1e1e', padding: '20px', borderRadius: '8px', color: '#fff' }}>
      <h2>{symbol} Balance</h2>
      {balance !== null ? (
        <p>
          {balance} {symbol} ≈ ${(price * parseFloat(balance)).toFixed(2)} USD
        </p>
      ) : (
        <p>Loading balance...</p>
      )}
    </div>
  );
}
