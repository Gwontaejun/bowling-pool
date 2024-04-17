import { NextRequest, NextResponse } from 'next/server';

import { ChiltenResDataType, SearchDataType } from '@src/app/api/getList/type';

// eslint-disable-next-line import/prefer-default-export
export const GET = async (
  request: NextRequest
): Promise<NextResponse<{ list: SearchDataType[] }>> => {
  const { searchParams } = new URL(request.url);

  const keyword = `${searchParams.get('keyword') ?? '거래'}`;

  const obj: ChiltenResDataType[] = await fetch(
    `https://api.chilten.com/v2/markets/posts?keyword=${keyword}&page=1`
  ).then((r) => r.json());

  const list: SearchDataType[] = [];

  obj.forEach((chilten) => {
    if (!chilten.filePath) {
      return;
    }

    list.push({
      id: chilten.id,
      link: `https://www.chilten.com/markets/${chilten.id}`,
      title: chilten.title,
      image: `https://175f8cbde885d84d.kinxzone.com${chilten.filePath}`,
      date: chilten.regDate,
    });
  });

  return NextResponse.json({ list });
};
