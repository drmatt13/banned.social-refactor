import { useState } from "react";

// components
import PostButton from "./PostButton";
import Posts from "./Posts";
import Post from "./Post";

// format = "public" || "profile" || "news"
const NewsFeed = ({ format, profile_id }) => {
  const [posts, setPosts] = useState([
    // {
    //   sender_id,
    //   receiver_id,
    //   post,
    //   url
    // }
  ]);

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
          {posts &&
            posts.map((post, i) => (
              <Post
                key={i}
                sender_id={post.user_id}
                reciever_id={post.profile_id}
                post={post.post}
                url={post.url}
              />
            ))}
          <Posts from={format} profile_id={profile_id} />
        </div>
      </div>
    </>
  );
};

export default NewsFeed;
