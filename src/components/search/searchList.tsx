'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { SearchDataType } from '@src/app/api/getList/type';

interface PropsType {
  list: SearchDataType[];
}

const SearchList = (props: PropsType) => {
  const { list } = props;

  const getPlatform = (platform: number) => {
    switch (platform) {
      case 1:
        return '칠텐';
      case 2:
        return '중고나라';
      case 5:
        return '당근';
      default:
    }
  };

  return (
    <ul>
      {list.map((item, index: number) => (
        <li key={`${index}`}>
          {getPlatform(item.platform)}
          <Image src={item.image} width={500} height={500} alt={item.title} />
          <Link href={item.link}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default SearchList;
