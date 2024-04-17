'use client';

import React from 'react';

interface PropsType {
  list: string[];
}

const SearchList = (props: PropsType) => {
  return (
    <ul>
      {props.list.map((item, index: number) => (
        <li key={`${index}`}>{item}</li>
      ))}
    </ul>
  );
};

export default SearchList;
