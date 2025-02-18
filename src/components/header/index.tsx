import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <div>
      <Link className="ml-12 bg-red-700" href="/">
        MAIN
      </Link>
      <Link href="/search">Search</Link>
      <Link href="/teamMake">TEAMMAKE</Link>
    </div>
  );
};

export default Header;
