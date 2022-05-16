import { useState } from "react";

// components
import PostButton from "./PostButton";
import Posts from "./Posts";

const NewsFeed = ({ format, profileId }) => {
  const [posts, setPosts] = useState([]);

  return (
    <>
      <div className="h-full w-full flex justify-center text-white">
        <div className="w-96 flex flex-col items-center">
          {format === "public" && (
            <>
              <div>search hashtags</div>
              <div>Public / Friends</div>
            </>
          )}
          {format === "news" && <div>News Header</div>}
          <PostButton
            format={format}
            profile_id={profileId}
            posts={posts}
            setPosts={setPosts}
          />
          <Posts posts={posts} setPosts={setPosts} />
        </div>
      </div>
    </>
  );
};

export default NewsFeed;
