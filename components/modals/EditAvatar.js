import { useState, useContext, useRef, useEffect } from "react";
import Image from "next/image";

// components
import ModalContainer from "./ModalContainer";
import Loading from "../Loading";

// context
import _appContext from "../../context/_appContext";

// utils
import service from "../../utils/service";

const EditAvatar = ({ background = true, blur = true }) => {
  const { avatars, user, setUser, logout } = useContext(_appContext);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(user.avatar);

  const containerRef = useRef();

  const select = (key) => {
    if (selected)
      containerRef.current.children[selected - 1].classList.remove("selected");
    containerRef.current.children[key - 1].classList.add("selected");
    setSelected(key);
  };

  const configureAvatar = async () => {
    setLoading(true);
    const data = await service("update avatar", {
      avatar: selected,
    });
    setLoading(false);
    const { success } = data;
    if (success) {
      setUser({ ...user, avatar: selected });
    } else {
      alert("Server Error");
      logout();
    }
  };

  return (
    <ModalContainer background={background} blur={blur}>
      <>
        <style jsx>{`
          .shadow:hover {
            box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
              rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
          }
          .selected {
            border: 2px solid #000;
            box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
              rgba(60, 64, 67, 0.15) 0px 2px 6px 2px !important;
            transform: scale(0.9);
          }
        `}</style>
        {loading ? (
          <div className="h-[375px]">
            <Loading />
          </div>
        ) : (
          <>
            <div className="max-h-[375px] flex flex-col">
              <div
                className="overflow-y-scroll grid grid-cols-4 gap-3 px-4 mx-2.5 mt-4 flex-1"
                ref={containerRef}
              >
                {Object.keys(avatars).map((key) => (
                  <div
                    key={key}
                    className="h-[100px] w-[100px] text-center select-none cursor-pointer text-[0] shadow rounded-lg overflow-hidden hover:scale-95 transition-all"
                    onClick={() => select(key)}
                  >
                    <Image
                      src={`/images/avatars/${avatars[key].name}`}
                      alt={avatars[key].name}
                      width="100"
                      height="100"
                      placeholder="blur"
                      blurDataURL={avatars[key].blurDataURL}
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
              <div className="pb-2.5 flex justify-center">
                <div
                  onClick={configureAvatar}
                  className={`flex justify-center items-center mt-2.5 mx-2.5 h-10 w-[92.5%] rounded-full select-none ${
                    selected
                      ? "text-white bg-blue-500 hover:bg-[rgb(64,161,251)] cursor-pointer"
                      : "text-black/40 bg-gray-300/50 cursor-not-allowed"
                  }`}
                >
                  Choose Avatar
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </ModalContainer>
  );
};

export default EditAvatar;
