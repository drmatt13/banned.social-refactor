import colors from "colors";

// mongoose
import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";

export default connectDB(async (req, res) => {
  const { _id, username } = req.body;

  // update username
  // console.log(req.body);
  try {
    const user = await User.findByIdAndUpdate(_id, {
      username,
    });
    if (user) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.log("user not found".bold.red);
    res.json({ success: false });
  }
});
