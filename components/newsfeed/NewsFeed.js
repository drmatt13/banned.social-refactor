import { useState, useEffect } from "react";

// utils
import service from "../../utils/service";

// components
import PostButton from "./PostButton";
import Posts from "./Posts";
import Post from "./Post";

// format = "public" || "profile" || "news"
const NewsFeed = ({ format, profile_id }) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});

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
            profile_id={profile_id}
            posts={posts}
            setPosts={setPosts}
          />
          {/* postbutton posts up top */}
          {posts && posts.map((post, i) => <Post key={i} post={post} />)}
          <Posts
            from={format}
            profile_id={profile_id}
            users={users}
            setUsers={setUsers}
          />
        </div>
      </div>
    </>
  );
};

export default NewsFeed;
