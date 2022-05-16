import { useState, useContext, useLayoutEffect, useCallback } from "react";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Cookie from "js-cookie";

// components
import Loading from "./Loading";

// context
import _appContext from "../context/_appContext";

// utils
import service from "../utils/service";

// styles
import background from "../styles/static.module.scss";
import glitch from "../styles/glitch.module.scss";

const Login = () => {
  const { router, user, setUser } = useContext(_appContext);

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [expires, setExpires] = useState(true);

  // if user exists or is updated, redirect to home
  useLayoutEffect(() => {
    if (user) {
      history.replaceState(null, null, "/");
      router.push("/");
    }
  }, [user]);

  const login = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      const data = await service("login", {
        username,
        password,
      });
      const { user, token, success, error } = data;
      console.log(data);
      if (success) {
        if (user && token) {
          Cookie.set("token", token, {
            expires: expires ? undefined : 3600,
          });
          setUser(user);
        } else {
          alert("login failed");
          setLoading(false);
        }
      } else {
        if (error) alert(error);
        setLoading(false);
      }
    },
    [username, password, expires, setUser]
  );

  const oAuth = useCallback(
    (provider) => {
      setLoading(true);
      signIn(provider, {
        callbackUrl: `/oauth?provider=${provider}&expires=${
          expires ? "true" : "false"
        }${router.query.redirect ? `&redirect=${router.query.redirect}` : ""}`,
      });
    },
    [expires, router, setLoading]
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
            <div className="h-full w-full z-10">
              <Loading />
            </div>
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
                    onSubmit={login}
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
                          placeholder="Email or Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required={true}
                          autoComplete="email"
                        />
                      </div>
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
                          autoComplete="current-password"
                        />
                      </div>
                    </div>
                    <div className="mt-3 flex text-[.6rem] sm:text-xs">
                      <input
                        className="custom-shadow flex-1 text-center py-1.5 sm:px-4 sm:py-3 bg-[#111] hover:bg-black text-white rounded cursor-pointer"
                        type="button"
                        value="REGISTER"
                        onClick={() => router.push("/register")}
                      />
                      <div className="flex-[.1]" />
                      <input
                        className="custom-shadow flex-1 text-center sm:px-4 sm:py-3 bg-[#ea4c88] hover:bg-pink-400 text-white rounded cursor-pointer"
                        type="submit"
                        value="SIGN IN"
                      />
                    </div>
                  </form>
                  <div className="flex w-full mt-3 text-sm sm:text-base">
                    <div className="flex-1 text-right">
                      <a className="sm:pr-3 cursor-pointer underline text-blue-500 hover:text-purple-500 whitespace-nowrap">
                        Reset password?
                      </a>
                    </div>
                    <div className="w-5" />
                    <div className="flex-1 flex items-center text-gray-300/75">
                      <input
                        className="mr-2"
                        type="checkbox"
                        name="expires"
                        checked={!expires}
                        onChange={(e) => setExpires(!e.target.checked)}
                      />
                      <label htmlFor="expires">Remember Me?</label>
                    </div>
                  </div>
                  <div className="text-sm sm:text-base mt-5 sm:mt-6 text-center text-gray-300/75">
                    or sign in with
                  </div>
                  <div className="flex mt-5 sm:mt-6 text-sm sm:text-base">
                    <div
                      className="custom-shadow sm:w-28 md:w-32 px-2 py-1 bg-gray-100/80 hover:bg-gray-100 rounded-full cursor-pointer flex justify-center items-center select-none"
                      onClick={() => oAuth("google")}
                    >
                      <img
                        className="w-4 h-4 mr-2"
                        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEyOCAxMjgiIGlkPSJTb2NpYWxfSWNvbnMiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnIGlkPSJfeDMxX19zdHJva2UiPjxnIGlkPSJHb29nbGUiPjxyZWN0IGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBoZWlnaHQ9IjEyOCIgd2lkdGg9IjEyOCIvPjxwYXRoIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTI3LjU4NSw2NGMwLTQuMTU3LDAuNjktOC4xNDMsMS45MjMtMTEuODgxTDcuOTM4LDM1LjY0OCAgICBDMy43MzQsNDQuMTgzLDEuMzY2LDUzLjgwMSwxLjM2Niw2NGMwLDEwLjE5MSwyLjM2NiwxOS44MDIsNi41NjMsMjguMzMybDIxLjU1OC0xNi41MDNDMjguMjY2LDcyLjEwOCwyNy41ODUsNjguMTM3LDI3LjU4NSw2NCIgZmlsbD0iI0ZCQkMwNSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PHBhdGggY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNjUuNDU3LDI2LjE4MmM5LjAzMSwwLDE3LjE4OCwzLjIsMjMuNTk3LDguNDM2TDEwNy42OTgsMTYgICAgQzk2LjMzNyw2LjEwOSw4MS43NzEsMCw2NS40NTcsMEM0MC4xMjksMCwxOC4zNjEsMTQuNDg0LDcuOTM4LDM1LjY0OGwyMS41NjksMTYuNDcxQzM0LjQ3NywzNy4wMzMsNDguNjQ0LDI2LjE4Miw2NS40NTcsMjYuMTgyIiBmaWxsPSIjRUE0MzM1IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02NS40NTcsMTAxLjgxOGMtMTYuODEyLDAtMzAuOTc5LTEwLjg1MS0zNS45NDktMjUuOTM3ICAgIEw3LjkzOCw5Mi4zNDlDMTguMzYxLDExMy41MTYsNDAuMTI5LDEyOCw2NS40NTcsMTI4YzE1LjYzMiwwLDMwLjU1Ny01LjU1MSw0MS43NTgtMTUuOTUxTDg2Ljc0MSw5Ni4yMjEgICAgQzgwLjk2NCw5OS44Niw3My42ODksMTAxLjgxOCw2NS40NTcsMTAxLjgxOCIgZmlsbD0iIzM0QTg1MyIgZmlsbC1ydWxlPSJldmVub2RkIi8+PHBhdGggY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTI2LjYzNCw2NGMwLTMuNzgyLTAuNTgzLTcuODU1LTEuNDU3LTExLjYzNkg2NS40NTd2MjQuNzI3ICAgIGgzNC4zNzZjLTEuNzE5LDguNDMxLTYuMzk3LDE0LjkxMi0xMy4wOTIsMTkuMTNsMjAuNDc0LDE1LjgyOEMxMTguOTgxLDEwMS4xMjksMTI2LjYzNCw4NC44NjEsMTI2LjYzNCw2NCIgZmlsbD0iIzQyODVGNCIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9nPjwvZz48L3N2Zz4="
                      />{" "}
                      Google
                    </div>
                    <div
                      className="custom-shadow sm:w-28 md:w-32 px-2 py-1 mx-2.5 sm:mx-6 bg-gray-100/80 hover:bg-gray-100 rounded-full cursor-pointer flex justify-center items-center select-none"
                      onClick={() => oAuth("facebook")}
                    >
                      <img
                        className="w-4 h-4 mr-2"
                        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iMTAwJSIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjEwMCUiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxwYXRoIGQ9Ik01MTIsMjU2YzAsLTE0MS4zODUgLTExNC42MTUsLTI1NiAtMjU2LC0yNTZjLTE0MS4zODUsMCAtMjU2LDExNC42MTUgLTI1NiwyNTZjMCwxMjcuNzc3IDkzLjYxNiwyMzMuNjg1IDIxNiwyNTIuODlsMCwtMTc4Ljg5bC02NSwwbDAsLTc0bDY1LDBsMCwtNTYuNGMwLC02NC4xNiAzOC4yMTksLTk5LjYgOTYuNjk1LC05OS42YzI4LjAwOSwwIDU3LjMwNSw1IDU3LjMwNSw1bDAsNjNsLTMyLjI4MSwwYy0zMS44MDEsMCAtNDEuNzE5LDE5LjczMyAtNDEuNzE5LDM5Ljk3OGwwLDQ4LjAyMmw3MSwwbC0xMS4zNSw3NGwtNTkuNjUsMGwwLDE3OC44OWMxMjIuMzg1LC0xOS4yMDUgMjE2LC0xMjUuMTEzIDIxNiwtMjUyLjg5WiIgc3R5bGU9ImZpbGw6IzE4NzdmMjtmaWxsLXJ1bGU6bm9uemVybzsiLz48cGF0aCBkPSJNMzU1LjY1LDMzMGwxMS4zNSwtNzRsLTcxLDBsMCwtNDguMDIyYzAsLTIwLjI0NSA5LjkxNywtMzkuOTc4IDQxLjcxOSwtMzkuOTc4bDMyLjI4MSwwbDAsLTYzYzAsMCAtMjkuMjk3LC01IC01Ny4zMDUsLTVjLTU4LjQ3NiwwIC05Ni42OTUsMzUuNDQgLTk2LjY5NSw5OS42bDAsNTYuNGwtNjUsMGwwLDc0bDY1LDBsMCwxNzguODljMTMuMDMzLDIuMDQ1IDI2LjM5MiwzLjExIDQwLDMuMTFjMTMuNjA4LDAgMjYuOTY2LC0xLjA2NSA0MCwtMy4xMWwwLC0xNzguODlsNTkuNjUsMFoiIHN0eWxlPSJmaWxsOiNmZmY7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PC9nPjwvc3ZnPg=="
                      />{" "}
                      Facebook
                    </div>
                    <div
                      className="custom-shadow sm:w-28 md:w-32 px-2 py-1 bg-gray-100/80 hover:bg-gray-100 rounded-full cursor-pointer flex justify-center items-center select-none"
                      onClick={() => oAuth("github")}
                    >
                      <img
                        className="w-4 h-4 mr-2"
                        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMC8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMS9SRUMtU1ZHLTIwMDEwOTA0L0RURC9zdmcxMC5kdGQnPjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgaWQ9IkxheWVyXzEiIHZlcnNpb249IjEuMCIgdmlld0JveD0iMCAwIDMyIDMyIiB3aWR0aD0iMzJweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBhdGggY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTYuMDAzLDBDNy4xNywwLDAuMDA4LDcuMTYyLDAuMDA4LDE1Ljk5NyAgYzAsNy4wNjcsNC41ODIsMTMuMDYzLDEwLjk0LDE1LjE3OWMwLjgsMC4xNDYsMS4wNTItMC4zMjgsMS4wNTItMC43NTJjMC0wLjM4LDAuMDA4LTEuNDQyLDAtMi43NzcgIGMtNC40NDksMC45NjctNS4zNzEtMi4xMDctNS4zNzEtMi4xMDdjLTAuNzI3LTEuODQ4LTEuNzc1LTIuMzQtMS43NzUtMi4zNGMtMS40NTItMC45OTIsMC4xMDktMC45NzMsMC4xMDktMC45NzMgIGMxLjYwNSwwLjExMywyLjQ1MSwxLjY0OSwyLjQ1MSwxLjY0OWMxLjQyNywyLjQ0MywzLjc0MywxLjczNyw0LjY1NCwxLjMyOWMwLjE0Ni0xLjAzNCwwLjU2LTEuNzM5LDEuMDE3LTIuMTM5ICBjLTMuNTUyLTAuNDA0LTcuMjg2LTEuNzc2LTcuMjg2LTcuOTA2YzAtMS43NDcsMC42MjMtMy4xNzQsMS42NDYtNC4yOTJDNy4yOCwxMC40NjQsNi43Myw4LjgzNyw3LjYwMiw2LjYzNCAgYzAsMCwxLjM0My0wLjQzLDQuMzk4LDEuNjQxYzEuMjc2LTAuMzU1LDIuNjQ1LTAuNTMyLDQuMDA1LTAuNTM4YzEuMzU5LDAuMDA2LDIuNzI3LDAuMTgzLDQuMDA1LDAuNTM4ICBjMy4wNTUtMi4wNyw0LjM5Ni0xLjY0MSw0LjM5Ni0xLjY0MWMwLjg3MiwyLjIwMywwLjMyMywzLjgzLDAuMTU5LDQuMjM0YzEuMDIzLDEuMTE4LDEuNjQ0LDIuNTQ1LDEuNjQ0LDQuMjkyICBjMCw2LjE0Ni0zLjc0LDcuNDk4LTcuMzA0LDcuODkzQzE5LjQ3OSwyMy41NDgsMjAsMjQuNTA4LDIwLDI2YzAsMiwwLDMuOTAyLDAsNC40MjhjMCwwLjQyOCwwLjI1OCwwLjkwMSwxLjA3LDAuNzQ2ICBDMjcuNDIyLDI5LjA1NSwzMiwyMy4wNjIsMzIsMTUuOTk3QzMyLDcuMTYyLDI0LjgzOCwwLDE2LjAwMywweiIgZmlsbD0iIzE4MTYxNiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PGcvPjxnLz48Zy8+PGcvPjxnLz48Zy8+PC9zdmc+"
                      />{" "}
                      Github
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Login;
