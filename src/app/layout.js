import './globals.css';

export const metadata = {
  title: 'Dragon Flash Wallet',
  description: 'A classic Web3 wallet to display your custom tokens',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
