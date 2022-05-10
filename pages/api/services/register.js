import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// mongoose
import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";

export default connectDB(async (req, res) => {
  // check for username, email and password
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      error: "Please fill in all fields",
    });
  }

  try {
    let user;
    // Check if user exists
    let users = await User.find({
      $or: [
        { username: req.body.username },
        { email: req.body.email.toLowerCase() },
      ],
    }).select("+password");
    for (let tempUser of users) {
      if (tempUser.username === req.body.username) {
        return res.status(200).json({
          success: false,
          error: "Username already exists",
        });
      }
      if (tempUser.email === req.body.email.toLowerCase()) {
        return res.status(200).json({
          success: false,
          error: "Email already exists",
        });
      }
    }

    // create user if not exists
    if (!user) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      user = await User.create(req.body);
      if (!user) {
        return res.status(400).json({
          success: false,
        });
      }
    }
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    user = user.toObject();
    delete user.password;
    return res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
    });
  }
});
