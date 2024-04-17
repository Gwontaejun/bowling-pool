import React from 'react';
import Image from 'next/image';

import { SearchDataType } from '@src/app/api/getList/type';
import Link from 'next/link';

interface PropsType {
  list: SearchDataType[];
}

const SearchList = (props: PropsType) => {
  const { list } = props;

  return (
    <ul>
      {list.map((item, index: number) => (
        <li key={`${index}`}>
          <Image src={item.image} width={500} height={500} alt={item.title} />
          <Link href={item.link}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default SearchList;
