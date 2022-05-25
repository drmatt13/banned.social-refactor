import colors from "colors";

// mongoose
import connectDB from "../../../utils/connectDB";
import Message from "../../../models/Message";

export default connectDB(async (req, res) => {
  const { _id, profile_id, page, limit, format, timeStamp } = req.body;

  // update user profile avatar
  try {
    // const user = await User.findByIdAndUpdate(_id, {
    //   avatar,
    // });
    // if (user) {
    res.json({
      success: true,
      posts: [
        {
          _id: "post_id",
          user_id: "user_id",
          profile_id: "profile_id",
          text: "fetched post 1",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          og_image: "image:link",
          most_recent_comments: [
            {
              _id: "comment_id",
              post_id: "post_id",
              user_id: "user_id",
              comment: "hello",
              url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
              og_image: "image:link",
            },
            {
              _id: "comment_id",
              post_id: "post_id",
              user_id: "user_id",
              comment: "hello",
              url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
              og_image: "image:link",
            },
          ],
        },
        {
          _id: "post_id",
          user_id: "user_id",
          profile_id: "profile_id",
          text: "fetched post 2",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          og_image: "image:link",
          most_recent_comments: [],
        },
      ],
    });
    // } else {
    //   res.json({ success: false });
    // }
  } catch (error) {
    console.log("user not found".bold.red);
    res.json({ success: false });
  }
});
