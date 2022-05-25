import colors from "colors";

// mongoose
import connectDB from "../../../utils/connectDB";
import Message from "../../../models/Message";

let count = 0;

export default connectDB(async (req, res) => {
  const { _id, profile_id } = req.body;

  try {
    res.json({
      success: true,
      post: {
        _id: "post_id",
        user_id: "user_id",
        profile_id: "profile_id",
        text: `created post ${count++}`,
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        og_image: "image:link",
        most_recent_comments: [],
      },
    });
  } catch (error) {
    console.log("error creating post".bold.red);
    res.json({ success: false });
  }
});
