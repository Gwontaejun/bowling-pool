import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line import/prefer-default-export
export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);

  const keyword = searchParams.get('keyword');

  const list = ['1', '2', '3', '4', '11111'].filter((item) =>
    item.includes(keyword as string)
  );

  return NextResponse.json({ list });
};
