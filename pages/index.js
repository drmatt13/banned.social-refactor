// components
import ProtectedPage from "../components/ProtectedPage";
import NewsFeed from "../components/newsfeed/NewsFeed";

const Home = () => {
  return (
    <ProtectedPage>
      <NewsFeed format="public" />
    </ProtectedPage>
  );
};

export default Home;
