'use client';
import { useState } from 'react';
import WBTCBalance from '../components/WBTCBalance';
import '../styles/globals.css';

export default function Home() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const [selectedAccount] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(selectedAccount);
    } else {
      alert("MetaMask not found");
    }
  };

  return (
    <main>
      <img src="/logo.png" alt="Dragon Logo" />
      <h1>Dragon Flash Wallet</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <p>Connected: {account}</p>
          <WBTCBalance walletAddress={account} />
        </>
      )}
    </main>
  );
}
