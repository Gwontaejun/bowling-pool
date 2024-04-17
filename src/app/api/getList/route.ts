import { NextResponse } from 'next/server';

const list = ['1', '2', '3', '4', '11111'];

export const GET = async (_req: string) => {
  return await NextResponse.json({ list: list });
};
