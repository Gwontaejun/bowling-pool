import type { Metadata } from 'next';
import SearchInput from '@src/components/search/searchInput';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SearchInput />
        {children}
      </body>
    </html>
  );
}
