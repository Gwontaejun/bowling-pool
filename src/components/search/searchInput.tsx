'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

interface SearchInputType {
  keyword: string;
}

const SearchInput = () => {
  const router = useRouter();

  const { register, handleSubmit, watch, reset } = useForm<SearchInputType>({
    defaultValues: { keyword: '' },
  });
  const watchData = watch('keyword');

  const onSubmitAction = (data: SearchInputType) => {
    if (data.keyword.length === 0) {
      alert('검색어를 입력해주세요.');

      return;
    }

    router.push(`/search/${data.keyword}`);
  };

  const onCleanKeyword = () => {
    reset({ keyword: '' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitAction)}>
      <input type="text" {...register('keyword')} />
      {watchData !== '' && (
        <button type="button" onClick={onCleanKeyword}>
          삭제
        </button>
      )}
      <button type="submit">dasdsa</button>
    </form>
  );
};

export default SearchInput;
