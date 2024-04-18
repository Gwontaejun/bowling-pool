import React, { Suspense } from 'react';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Suspense fallback={<>로딩중...</>}>{children}</Suspense>
    </div>
  );
};

export default layout;
