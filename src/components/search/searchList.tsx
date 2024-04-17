'use client';

import React from 'react';

interface PropsType {
  list: string[];
}

const SearchList = (props: PropsType) => {
  const { list } = props;

  return (
    <ul>
      {list.map((item, index: number) => (
        <li key={`${index}`}>{item}</li>
      ))}
    </ul>
  );
};

export default SearchList;
