'use client';

import { useState } from 'react';

export default function Home() {
  const [wallet, setWallet] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWallet(accounts[0]);
      } catch (err) {
        console.error(err);
      }
    } else {
      alert('Please install MetaMask or a Web3 wallet');
    }
  };

  return (
    <main style={{ textAlign: 'center' }}>
      <img src="/dragon-logo.png" alt="Dragon Flash Logo" style={{ width: 150, marginBottom: 20 }} />
      <h1>Dragon Flash Wallet</h1>
      {!wallet ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Wallet Connected: {wallet}</p>
      )}
    </main>
  );
}
