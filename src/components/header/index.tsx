import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div>
      <Link href="/">MAIN</Link>
      <Link href="/search">Search</Link>
      <Link href="/teamMake">TEAMMAKE</Link>
    </div>
  );
};

export default Header;
