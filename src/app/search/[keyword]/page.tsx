import React from 'react';
import SearchList from '@src/components/search/searchList';

interface PropsType {
  params: {
    keyword: string;
  };
}

const Page = async ({ params }: PropsType) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/getList?keyword=${params.keyword}`,
    {
      next: { revalidate: 3600 },
    }
  ).then((r) => r.json());

  return (
    <div>
      <SearchList list={data.list} />
    </div>
  );
};

export default Page;
