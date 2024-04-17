import SearchList from '@src/components/search/searchList';

const Home = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/getList?keyword=${1}`,
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

export default Home;
