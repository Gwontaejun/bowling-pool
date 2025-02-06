import React from 'react';
import SearchInput from '@src/components/search/searchInput';
import SearchList from '@src/components/search/searchList';

interface PropsType {
  params: {
    keyword: string;
  };
}

const Page = async ({ params }: PropsType) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/getList?keyword=${params.keyword}`
  ).then((r) => r.json());

  return (
    <div>
      <SearchInput />
      <SearchList list={data.list} />
    </div>
  );
};

export default Page;
