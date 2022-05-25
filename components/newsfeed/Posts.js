import { useState, useEffect } from "react";

// components
import Loading from "../Loading";
import Post from "./Post";

// utils
import service from "../../utils/service";

const Posts = ({ format, profile_id, users, setUsers }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [limit] = useState(10);
  const [timeStamp] = useState(Date.now());

  const getPosts = async () => {
    setLoading(true);
    const data = await service("get posts", {
      profile_id,
      page,
      limit,
      format,
      timeStamp,
    });
    console.log(data.posts);
    // setPosts([...posts, ...data.posts]);
    setPosts(data.posts);
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return <>{posts && posts.map((post, i) => <Post key={i} post={post} />)}</>;
};

export default Posts;
