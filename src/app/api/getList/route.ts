import { NextResponse } from 'next/server';

// eslint-disable-next-line import/prefer-default-export
export const GET = async () => {
  const list = ['1', '2', '3', '4', '11111'];

  return NextResponse.json({ list });
};
