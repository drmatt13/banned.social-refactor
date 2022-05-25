import { useState, useContext } from "react";

// context
import _appContext from "../../context/_appContext";

// utils
import service from "../../utils/service";

// format = "public" || "profile" || "news"
const PostButton = ({ format, profile_id, posts, setPosts }) => {
  const { user } = useContext(_appContext);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState("");

  const createPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await service("create post", {
      // username,
      // password,
    });
    const { post } = data;
    setPosts([post, ...posts]);
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={createPost}>
        <input
          type="text"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          className="text-black"
        />
        <input
          disabled={loading}
          type="submit"
          value="post"
          className={`ml-4 px-2 ${
            loading
              ? "bg-gray-900 cursor-not-allowed"
              : "bg-gray-700 hover:bg-gray-500 cursor-pointer"
          }`}
        />
      </form>
    </>
  );
};

export default PostButton;
