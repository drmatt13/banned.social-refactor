import { useEffect } from "react";

const Post = ({ post }) => {
  useEffect(() => {
    // console.log(post);
  }, []);

  return <div>{post.text}</div>;
};

export default Post;
