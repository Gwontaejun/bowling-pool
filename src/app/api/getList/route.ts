import { NextRequest, NextResponse } from 'next/server';

import { SearchDataType } from '@src/app/api/getList/type';
import { chilten, joongna, bunjang, ggammani, danggn } from '@src/service';

// eslint-disable-next-line import/prefer-default-export
export const GET = async (
  request: NextRequest
): Promise<NextResponse<{ list: SearchDataType[] }>> => {
  const { searchParams } = new URL(request.url);

  const keyword = searchParams.get('keyword');

  const crawlResult = await Promise.all([
    ...(await chilten(keyword ?? '')),
    ...(await joongna(keyword ?? '')),
    ...(await bunjang(keyword ?? '')),
    ...(await ggammani(keyword ?? '')),
    ...(await danggn(keyword ?? '')),
  ]);

  return NextResponse.json({ list: crawlResult });
};
