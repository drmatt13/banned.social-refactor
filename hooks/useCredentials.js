import { useState, useEffect } from "react";
import Cookie from "js-cookie";

// utils
import service from "../utils/service";

const useCredentials = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const checkCredentials = async () => {
    // check if no token cookie exists
    if (!Cookie.get("token")) return setLoading(false);
    // check if token cookie is valid and update current user
    try {
      const data = await service("get user");
      if (data.user) setUser(data.user);
    } catch (error) {
      console.log("invalid token".bold.red);
    }
    setLoading(false);
  };

  useEffect(checkCredentials, []);

  return { loading, user, setUser };
};

export default useCredentials;
