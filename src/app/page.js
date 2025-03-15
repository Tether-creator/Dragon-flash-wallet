'use client';

import { useState } from 'react';
import WBTCBalance from '../components/WBTCBalance';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
    } else {
      alert('Please install MetaMask');
    }
  };

  return (
    <main style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <img src="/dragon-logo.png" alt="Dragon Flash Logo" width="200" style={{ marginBottom: '20px' }} />
      <h1>Dragon Flash Wallet</h1>

      {!walletAddress ? (
        <button onClick={connectWallet} style={{ padding: '10px 20px', marginTop: '20px' }}>Connect Wallet</button>
      ) : (
        <>
          <p>Connected: {walletAddress}</p>
          <WBTCBalance walletAddress={walletAddress} />
        </>
      )}
    </main>
  );
}
