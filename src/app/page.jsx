'use client';
import React from 'react';
import WBTCBalance from '../components/WBTCBalance';

export default function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Dragon Flash Wallet</h1>
      <WBTCBalance />
    </div>
  );
}
