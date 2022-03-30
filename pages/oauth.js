import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Cookie from "js-cookie";

// components
import Loading from "../components/Loading";

// context
import _appContext from "../context/_appContext";

// utils
import service from "../utils/service";

const Oauth = () => {
  const { data: session } = useSession();
  const { logout, router, user_id, setUser_id } = useContext(_appContext);
  const [processing, setProcessing] = useState(false);

  const login = async () => {
    const data = await service("oauth", {
      email: "",
      password: "",
    });
    if (data.user && data.token) {
      Cookie.set("token", data.token);
      setUser_id(data.user.user_id);
    } else {
      alert("login failed");
      logout();
    }
  };

  // if user_id exists or is updated, redirect to home
  useEffect(() => {
    if (user_id && router) {
      router.push(`/${router.query.redirect ? router.query.redirect : ""}`);
    }
  }, [user_id, router]);

  useEffect(() => {
    if (
      !processing &&
      typeof session !== "undefined" &&
      session !== null &&
      ["github", "google", "facebook", "apple"].includes(router.query.provider)
    ) {
      setProcessing(true);
      login();
    }
  }, [processing, setProcessing, session, router]);

  return <Loading />;
};

export default Oauth;
