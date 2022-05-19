import { useState } from "react";

// utils
import service from "../../utils/service";

// format = "public" || "profile" || "news"
const PostButton = ({ format, profile_id, posts, setPosts }) => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // const data = await service("post", {
    //   username,
    //   password,
    // });
    // const { user, token, success, error } = data;
    console.log("post");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          className="text-black"
        />
        <input type="submit" value="post" />
      </form>
    </>
  );
};

export default PostButton;
