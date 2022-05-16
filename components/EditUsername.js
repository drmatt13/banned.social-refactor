import { useContext, useState, useRef } from "react";
import Head from "next/head";

// components
import Loading from "./Loading";

// context
import _appContext from "../context/_appContext";

// utils
import service from "../utils/service";

const EditUsername = ({ placeholder }) => {
  const { user, setUser } = useContext(_appContext);
  const submitRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  const updateUsername = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await service("update username", {
      username,
    });
    setLoading(false);
    const { success } = data;
    if (success) {
      setUser({ ...user, username });
    } else {
      alert("Username already exists");
    }
  };

  return (
    <>
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
      <div>
        <form onSubmit={updateUsername}>
          <div className="flex">
            <div className="custom-shadow flex rounded overflow-hidden">
              <div className="py-2 w-12 flex justify-center items-center bg-[#313436]">
                <i className="text-xs fa-solid fa-user text-gray-500" />
              </div>
              <input
                className="w-full px-2 py-2 focus:outline-none text-gray-300 bg-[#3b4148] hover:bg-[#424850] focus:bg-[#424850]"
                type="text"
                placeholder={placeholder}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={true}
                minLength={3}
                maxLength={25}
              />
            </div>
            <div
              onClick={() => submitRef.current.click()}
              className={`custom-shadow ml-4 text-center h-10 w-10 flex justify-center items-center rounded-full transition-colors ${
                3 <= username.length && username.length <= 25
                  ? "bg-emerald-500 hover:bg-emerald-400 cursor-pointer text-white"
                  : "bg-gray-700 cursor-not-allowed text-gray-500"
              }`}
            >
              <i
                className={`${
                  3 <= username.length && username.length <= 25
                    ? "fa-solid fa-check"
                    : "fa-solid fa-xmark"
                }`}
              />
            </div>
            <input type="submit" className="hidden" ref={submitRef} />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditUsername;
