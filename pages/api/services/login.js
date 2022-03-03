import colors from "colors";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// mongoose
// import connectDB from "../../../utils/connectDB";
// import User from "../../../models/User";

export default async (req, res) => {
  const { email, password, expires } = req.body;

  const token = jwt.sign(
    { user_id: "123456789", expires },
    process.env.BEARER_SECRET
  );

  return res.json({
    success: true,
    token,
    user: { user_id: "123456789" },
  });
};

// export default connectDB(async (req, res) => {

//   const {email, password} = req.body;

//   try {
//     const user = await User.findOne({email}).select('password');
//     const auth = await bcrypt.compare(password, user.password);
//     if (auth) {
//       const user_id = user._id;
//       const bearer = jwt.sign({user_id}, process.env.BEARER_SECRET);
//       res.json({ success: true, bearer, user_id });
//     }
//     else res.json({ success: false });
//   } catch (error) {
//     console.error("login error".bold.red);
//     res.json({ success: false });
//   }

// })
