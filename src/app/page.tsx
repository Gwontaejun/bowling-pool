import SearchList from '@src/components/main/searchList';

const Home = async () => {
  // const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getList`, {
  //   next: { revalidate: 3600 },
  // }).then((r) => r.json());

  return (
    <div>
      <SearchList list={[]} />
    </div>
  );
};

export default Home;
