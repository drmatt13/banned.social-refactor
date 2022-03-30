import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

// mongoose
// import connectDB from "../../../utils/connectDB";
// import User from "../../../models/User";

export default async (req, res) => {
  const { email, password, user_id, csrfToken } = req.body;

  // if no csrf token, return success: false

  // get user
  // user_id = "123456789";

  // if no user found, create one
  // create user

  // sign user_id into a token
  const token = jwt.sign({ user_id: "123456789" }, process.env.TOKEN_SECRET);

  return res.json({
    success: true,
    token,
    user: { user_id: "123456789" },
  });
};
