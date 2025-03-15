export const metadata = {
  title: 'Dragon Flash Wallet',
  description: 'Connect and track your Web3 wallet',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'sans-serif', backgroundColor: '#111', color: '#fff' }}>
        {children}
      </body>
    </html>
  );
}
