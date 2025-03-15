'use client';

import WBTCBalance from '../../components/WBTCBalance';

export default function Page() {
  return (
    <main style={{ padding: '20px', backgroundColor: '#0f0f0f', minHeight: '100vh', color: 'white' }}>
      <h1>Dragon Flash Wallet</h1>
      <WBTCBalance />
    </main>
  );
}
