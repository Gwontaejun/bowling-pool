import { NextRequest, NextResponse } from 'next/server';
import { getCrawlList } from '@src/service';

import { SearchDataType } from '@src/app/api/getList/type';

// eslint-disable-next-line import/prefer-default-export
export const GET = async (
  request: NextRequest
): Promise<NextResponse<{ list: SearchDataType[] }>> => {
  const { searchParams } = new URL(request.url);

  const keyword = searchParams.get('keyword');

  const crawlResult = await getCrawlList(keyword ?? '');

  return NextResponse.json({ list: crawlResult });
};
