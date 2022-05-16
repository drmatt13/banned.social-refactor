// components
import UnprotectedPage from "../../components/UnprotectedPage";
import NewsFeed from "../../components/newsfeed/NewsFeed";

const Index = () => {
  return (
    <UnprotectedPage>
      <div className="w-full flex justify-center bg-white">Profile Header</div>
      <NewsFeed format="profile" profileId="profileId" />
    </UnprotectedPage>
  );
};

export default Index;
