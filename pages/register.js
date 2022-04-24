import { useState, useContext, useEffect } from "react";
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

const Register = () => {
  const { router, user, setUser } = useContext(_appContext);

  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  // if user exists or is updated, redirect to home
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const register = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("passwords do not match");
      return;
    }
    setLoading(true);
    const data = await service("register", {
      // firstName,
      // lastName,
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
      }
    }
    setLoading(false);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      {loading ? (
        <Loading />
      ) : (
        <>
          <form
            onSubmit={register}
            className="flex flex-col items-center w-60 p-4 bg-gray-100/75 rounded-lg animate-fade-in"
          >
            <div className="flex flex-col mt-2 w-52">
              {/* <input
                className="border border-gray-400 mb-2 p-2 rounded"
                type="text"
                placeholder="first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required={true}
                autoComplete="given-name"
              />
              <input
                className="border border-gray-400 mb-2 p-2 rounded"
                type="text"
                placeholder="last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required={true}
                autoComplete="family-name"
              /> */}
              <input
                className="border border-gray-400 mb-2 p-2 rounded"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength={3}
                required={true}
              />
              <input
                className="border border-gray-400 mb-2 p-2 rounded"
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                autoComplete="email"
              />
              <input
                className="border border-gray-400 mb-2 p-2 rounded"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required={true}
                autoComplete="new-password"
              />
              <input
                className="border border-gray-400 mb-2 p-2 rounded"
                type="password"
                placeholder="confirm password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                minLength={6}
                required={true}
                autoComplete="new-password"
              />
            </div>
            <input
              type="submit"
              className="select-none mb-2 py-2 px-10 w-full flex justify-center items-center rounded border border-sky-500/75 shadow cursor-pointer bg-sky-500 hover:bg-sky-400 text-gray-200 hover:text-white transition-colors"
              value="Register"
            />
            <Link href="/login">
              <a className="text-blue-500 hover:underline hover:text-purple-500">
                Return to login
              </a>
            </Link>
          </form>
        </>
      )}
    </div>
  );
};

export default Register;
