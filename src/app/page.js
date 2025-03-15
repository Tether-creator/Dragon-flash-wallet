'use client';

import React from 'react';
import Image from 'next/image';
import './globals.css';

export default function Home() {
  return (
    <main className="container">
      <Image src="/dragon-logo.png" alt="Dragon Flash Logo" width={120} height={120} />
      <h1>Dragon Flash Wallet</h1>
      <p>Connect your wallet to view and interact with your custom tokens.</p>
      <button className="connect-button">Connect Wallet</button>
    </main>
  );
}
