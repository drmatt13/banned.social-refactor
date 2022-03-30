import colors from "colors";
import axios from "axios";
import jwt from "jsonwebtoken";
import { getToken } from "next-auth/jwt";

// utils
import connectDB from "../../utils/connectDB";

export default async (req, res) => {
  const { body, cookies } = req;

  // verify validity of the token in the cookie and return the user_id
  let verifiedToken;
  try {
    verifiedToken = jwt.verify(cookies.token, process.env.TOKEN_SECRET);
    body.user_id = verifiedToken.user_id;
  } catch (error) {
    body.user_id = null;
  }

  // if no standard token, check for csrf token
  if (!body.user_id) {
    try {
      body.data.csrfToken = await getToken({ req });
    } catch (error) {
      body.data.csrfToken = null;
    }
  }

  // log request
  let token_id = body.user_id
    ? body.user_id
    : cookies.token
    ? "Invalid Token"
    : "No Token";
  console.log(
    `${token_id}`.bold.yellow,
    "->".bold.red,
    `${body.service}`.bold.green
  );

  try {
    switch (body.service) {
      // *****************************
      // ****  NO DB REQUIRED  *******
      // *****************************

      case "get og":
        break;

      // *****************************
      // *******  USER DB  ***********
      // *****************************

      // Get user
      // Unprotected
      // returns myself or optional profile_id, returns if profile or not
      // { profile_id <optional> }
      case "get user":
        req = await axios.post(
          `${process.env.URL}/api/services/user`,
          body.data
        );
        break;

      // Login
      // Unprotected
      // returns jwt
      // { email, password }
      case "login":
        req = await axios.post(
          `${process.env.URL}/api/services/login`,
          body.data
        );
        break;

      // Login with Oauth
      // Unprotected
      // returns jwt
      // { email, password, csrfToken }
      case "oauth":
        req = await axios.post(
          `${process.env.URL}/api/services/oauth`,
          body.data
        );
        break;

      // Register user
      // Unprotected
      // registers a user
      // { firstName, lastName, email, password }
      case "register":
        req = await axios.post(
          `${process.env.URL}/api/services/register`,
          body.data
        );
        break;

      // *****************************
      // *******  POST DB  ***********
      // *****************************

      // *****************************
      // *******  NEWS DB  ***********
      // *****************************

      // *****************************
      // *******  DEFAULT  ***********
      // *****************************

      default:
        console.log("Invalid Service".bold.red);
        req.data = {
          error: "Invalid Service",
          success: false,
        };
        break;
    }
    res.status(200).json({ ...req.data });
  } catch (error) {
    console.log(`${error}`.bold.red);
    res.status(200).json({ success: false });
  }
};
