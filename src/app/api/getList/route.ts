import { NextRequest, NextResponse } from 'next/server';

import { SearchDataType } from '@src/app/api/getList/type';
import { chilten, danggn } from '@src/service';

// eslint-disable-next-line import/prefer-default-export
export const GET = async (
  request: NextRequest
): Promise<NextResponse<{ list: SearchDataType[] }>> => {
  const { searchParams } = new URL(request.url);

  const keyword = searchParams.get('keyword');

  const crawlResult = await Promise.all([
    ...(await chilten(keyword ?? '')),
    ...(await danggn(keyword ?? '')),
    // ...(await joongna(keyword ?? '')),
  ]);

  return NextResponse.json({ list: crawlResult });
};
