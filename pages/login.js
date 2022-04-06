import { useState, useContext, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import Cookie from "js-cookie";

// components
import Loading from "../components/Loading";

// context
import _appContext from "../context/_appContext";

// utils
import service from "../utils/service";

// styles
// ..

const Login = () => {
  const { router, user } = useContext(_appContext);

  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState(1);

  const toggleLoginMethod = () => {
    setLoginMethod(loginMethod === 1 ? 2 : 1);
  };

  // if user exists or is updated, redirect to home
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      {loading ? (
        <Loading />
      ) : (
        <div className="animate-fade-in flex flex-col justify-center items-center">
          <div className="flex flex-col items-center w-60 px-4 pt-4 pb-2 bg-gray-100/75 rounded-lg">
            {loginMethod === 1 && <DefaultLogin setLoading={setLoading} />}
            {loginMethod === 2 && <AltLogin setLoading={setLoading} />}
            <div
              className="select-none mb-2 py-2 w-full flex justify-center items-center rounded border border-gray-900 shadow cursor-pointer bg-black hover:bg-gray-800 text-gray-200 hover:text-white transition-all hover:shadow-lg"
              onClick={toggleLoginMethod}
            >
              {loginMethod === 1 ? "alternate login" : "back"}
            </div>
            <Link href="/register">
              <a className="mb-2 text-blue-500 hover:underline hover:text-purple-500">
                Sign Up Today
              </a>
            </Link>
          </div>
          <Link href="/unprotected-test">
            <a className="mt-6 text-blue-500 hover:underline hover:text-purple-500">
              unprotected page link
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Login;

const DefaultLogin = ({ setLoading }) => {
  const { setUser } = useContext(_appContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [expires, setExpires] = useState(true);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await service("login", {
      username,
      password,
    });
    const { user, token, success } = data;
    if (success) {
      if (user && token) {
        Cookie.set("token", token, {
          expires: expires ? undefined : 3600,
        });
        setUser(user);
      } else {
        alert("login failed");
      }
    } else {
      alert("login failed");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={login}
      className="flex flex-col items-center animate-fade-in"
    >
      <div className="flex flex-col w-52 mt-2">
        <input
          className="border border-gray-400 mb-2 p-2 rounded"
          type="text"
          placeholder="username or email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={true}
          autoComplete="email"
        />
        <input
          className="border border-gray-400 mb-3 p-2 rounded"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
          minLength={6}
          autoComplete="current-password"
        />
      </div>
      <div className="w-full mb-3 flex items-center justify-center">
        <input
          className="mr-2"
          type="checkbox"
          name="expires"
          checked={!expires}
          onChange={(e) => setExpires(!e.target.checked)}
        />
        <label htmlFor="expires">Stay logged in?</label>
      </div>
      <input
        type="submit"
        className="select-none mb-1 py-2 w-full flex justify-center items-center rounded border border-sky-500/75 shadow cursor-pointer bg-sky-500 hover:bg-sky-400 text-gray-200 hover:text-white transition-all hover:shadow-lg"
        value="login"
      />
    </form>
  );
};

import { signIn } from "next-auth/react";

const AltLogin = () => {
  const [expires, setExpires] = useState(true);

  const { router } = useContext(_appContext);

  return (
    <div className="w-full animate-fade-in">
      <div
        onClick={() =>
          signIn("facebook", {
            callbackUrl: `/oauth?provider=facebook&expires=${
              expires ? "true" : "false"
            }${
              router.query.redirect ? `&redirect=${router.query.redirect}` : ""
            }`,
          })
        }
        className="select-none mb-2 py-2 w-full flex justify-center items-center rounded border border-blue-600/60 shadow cursor-pointer bg-blue-600 hover:bg-blue-500 text-gray-200 hover:text-white transition-all hover:shadow-lg"
      >
        <i className="devicon-facebook-plain mr-2" />
        facebook login
      </div>
      <div
        onClick={() =>
          signIn("apple", {
            callbackUrl: `/oauth?provider=apple&expires=${
              expires ? "true" : "false"
            }${
              router.query.redirect ? `&redirect=${router.query.redirect}` : ""
            }`,
          })
        }
        className="select-none mb-2 py-2 w-full flex justify-center items-center rounded border border-red-500/50 shadow cursor-pointer bg-red-500 hover:bg-red-500/80 text-gray-200 hover:text-white transition-all hover:shadow-lg"
      >
        <i className="devicon-apple-original mr-2" />
        apple login
      </div>
      <div
        onClick={() =>
          signIn("github", {
            callbackUrl: `/oauth?provider=github&expires=${
              expires ? "true" : "false"
            }${
              router.query.redirect ? `&redirect=${router.query.redirect}` : ""
            }`,
          })
        }
        className="select-none mb-2 py-2 w-full flex justify-center items-center rounded border border-gray-900 shadow cursor-pointer bg-black hover:bg-gray-800 text-gray-200 hover:text-white transition-all hover:shadow-lg"
      >
        <i className="devicon-github-original mr-2 text-white" />
        github login
      </div>
      <div
        onClick={() =>
          signIn("google", {
            callbackUrl: `/oauth?provider=google&expires=${
              expires ? "true" : "false"
            }${
              router.query.redirect ? `&redirect=${router.query.redirect}` : ""
            }`,
          })
        }
        className="select-none mb-2 py-2 w-full flex justify-center items-center rounded border border-gray-300 shadow cursor-pointer bg-white/95 hover:bg-white text-gray-900 hover:text-black transition-all hover:shadow-lg"
      >
        <img
          className="h-4 mr-2"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
        />
        google login
      </div>
      <div className="w-full mb-2 flex items-center justify-center">
        <input
          className="mr-2"
          type="checkbox"
          name="expires"
          checked={!expires}
          onChange={(e) => setExpires(!e.target.checked)}
        />
        <label htmlFor="expires">Stay logged in?</label>
      </div>
    </div>
  );
};
