import SearchList from '@src/components/main/searchList';

const Home = () => {
  const list = ['1', '2', '3'];

  return (
    <div>
      <SearchList list={list} />
    </div>
  );
};

export default Home;
