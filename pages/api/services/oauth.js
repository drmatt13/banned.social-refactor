import jwt from "jsonwebtoken";
import { decode } from "next-auth/jwt";

// mongoose
import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";

export default connectDB(async (req, res) => {
  try {
    const decodedSessionToken = await decode({
      token: req.body.sessionToken,
      secret: process.env.NEXTAUTH_SECRET,
    });
    // console.log(decodedSessionToken);
    // // check if email exists in database
    // let user = await User.findOne({ email: decodedSessionToken.email });
    // if (!user) {
    //   // if email does not exist, create user
    //   user = await User.create({
    //     firstName: "undefined",
    //     lastName: "undefined",
    //     email: decodedSessionToken.email,
    //     username: decodedSessionToken.name,
    //     password: "undefined",
    //   });
    // }
    // const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    // user = user.toObject();
    // delete user.password;
    // return res.json({
    //   success: true,
    //   token,
    //   user,
    // });
    return res.json({
      success: true,
      test: decodedSessionToken,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});
