import { useState, useContext, useLayoutEffect, useCallback } from "react";
import Head from "next/head";
import Cookie from "js-cookie";

// components
import Loading from "../components/Loading";

// context
import _appContext from "../context/_appContext";

// utils
import service from "../utils/service";

// styles
import background from "../styles/static.module.scss";
import glitch from "../styles/glitch.module.scss";

const Register = () => {
  const { router, user, setUser } = useContext(_appContext);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  // if user exists or is updated, redirect to home
  useLayoutEffect(() => {
    if (user) {
      history.replaceState(null, null, "/");
      router.push("/");
    }
  }, [user]);

  const register = useCallback(
    async (e) => {
      e.preventDefault();
      if (password !== password2) {
        alert("passwords do not match");
        return;
      }
      setLoading(true);
      const data = await service("register", {
        username,
        email,
        password,
      });
      const { user, token, success, error } = data;
      console.log(data);
      if (success) {
        Cookie.set("token", token);
        setUser(user);
      } else {
        if (error) {
          alert(error);
          setLoading(false);
        }
      }
    },
    [email, password, password2, setUser, username]
  );

  return (
    <div className="h-full w-full flex flex-col items-center">
      <Head>
        <title>Banned.Social | Login</title>
      </Head>
      {!user && (
        <>
          <div className={`${background.container}`} />
          {loading ? (
            <Loading />
          ) : (
            <div className="h-screen w-full overflow-y-auto z-10">
              <div className="z-10 flex flex-col items-center mt-[20vh] mb-16 md:mb-20">
                <style jsx>{`
                  ::placeholder {
                    color: #8888;
                  }
                  :-ms-input-placeholder {
                    color: #8888;
                  }
                  ::-ms-input-placeholder {
                    color: #8888;
                  }
                  .custom-shadow {
                    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                  }
                `}</style>
                <div
                  className={`${glitch.login_header} select-none font-mono text-4xl sm:text-5xl md:text-6xl md:w-[26.75rem]`}
                >
                  <div className={`${glitch.glitch}`} data-text="banned.social">
                    banned.social
                  </div>
                </div>
                <div className="mt-16 flex flex-col items-center animate-fade-in">
                  <form
                    onSubmit={register}
                    className="w-52 text-sm sm:w-72 sm:text-base"
                  >
                    <div className="flex flex-col items-center">
                      <div className="custom-shadow w-full flex rounded overflow-hidden">
                        <div className="py-2 w-12 flex justify-center items-center bg-[#313436]">
                          <i className="text-xs fa-solid fa-user text-gray-500" />
                        </div>
                        <input
                          className="w-full px-2 py-2 focus:outline-none text-gray-300 bg-[#3b4148] hover:bg-[#424850] focus:bg-[#424850]"
                          type="text"
                          placeholder="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          minLength={3}
                          required={true}
                        />
                      </div>
                      <div className="custom-shadow mt-3 w-full flex rounded overflow-hidden">
                        <div className="py-2 w-12 flex justify-center items-center bg-[#313436]">
                          <i className="text-xs fa-solid fa-envelope text-gray-500" />
                        </div>
                        <input
                          className="w-full px-2 py-2 focus:outline-none text-gray-300 bg-[#3b4148] hover:bg-[#424850] focus:bg-[#424850]"
                          type="email"
                          placeholder="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required={true}
                          autoComplete="email"
                        />
                      </div>
                      {/*  */}
                      <div className="custom-shadow mt-3 w-full flex rounded overflow-hidden">
                        <div className="py-2 w-12 flex justify-center items-center bg-[#313436]">
                          <i className="text-xs fa-solid fa-lock text-gray-500" />
                        </div>
                        <input
                          className="w-full px-2 py-2 focus:outline-none text-gray-300 bg-[#3b4148] hover:bg-[#424850] focus:bg-[#424850]"
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required={true}
                          minLength={6}
                          autoComplete="current-password"
                        />
                      </div>
                      {/*  */}
                      <div className="custom-shadow mt-3 w-full flex rounded overflow-hidden">
                        <div className="py-2 w-12 flex justify-center items-center bg-[#313436]">
                          <i className="text-xs fa-solid fa-lock text-gray-500" />
                        </div>
                        <input
                          className="w-full px-2 py-2 focus:outline-none text-gray-300 bg-[#3b4148] hover:bg-[#424850] focus:bg-[#424850]"
                          type="password"
                          placeholder="confirm password"
                          value={password2}
                          onChange={(e) => setPassword2(e.target.value)}
                          minLength={6}
                          required={true}
                          autoComplete="new-password"
                        />
                      </div>
                      {/*  */}
                    </div>
                    <div className="mt-3 flex text-[.6rem] sm:text-xs">
                      <input
                        className="custom-shadow flex-1 text-center py-1.5 sm:px-4 sm:py-3 bg-[#111] hover:bg-black text-white rounded cursor-pointer"
                        type="button"
                        value="SIGN IN"
                        onClick={() => router.push("/login")}
                      />
                      <div className="flex-[.1]" />
                      <input
                        className="custom-shadow flex-1 text-center sm:px-4 sm:py-3 bg-[#ea4c88] hover:bg-pink-400 text-white rounded cursor-pointer"
                        type="submit"
                        value="REGISTER"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Register;
