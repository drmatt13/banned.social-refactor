import { useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";

// components
import NavButton from "./NavButton";

// context
import _appContext from "../context/_appContext";

// styles
import styles from "../styles/Navbar.module.scss";

const Navbar = ({ nav, buttons, setButtons, setModal, toggleModal }) => {
  const { mobile, logout } = useContext(_appContext),
    navRef = useRef(),
    parentRef = useRef(),
    childRef = useRef();

  const setNotifications = () => {};

  // const redirectHome = async () => {
  //   if (["/", "/#about", "/#getintouch"].includes(router.pathname))
  //     await router.push(`/#home`);
  //   else await router.push("/");
  //   setButtons(false);
  //   setModal(undefined);
  // };

  const toggleButtons = () => {
    if (buttons === undefined) setButtons(true);
    else setButtons(!buttons);
  };

  useEffect(() => {
    const adjustHeight = () => {
      const size =
        window.screen.height / 20 > 36
          ? 36
          : window.screen.height / 20 < 24
          ? 24
          : window.screen.height / 20;
      parentRef.current.parentNode.setAttribute(
        "style",
        `height: ${size}px !important; width: ${size}px !important;`
      );
    };
    const adjustPadding = () => {
      const size =
        window.screen.width / 12.5 > 36
          ? 36
          : window.screen.width / 12.5 < 24
          ? 24
          : window.screen.width / 12.5;
      navRef.current.setAttribute(
        "style",
        `padding-right: ${size}px !important;`
      );
    };
    if (mobile) {
      screen.orientation.addEventListener("change", adjustHeight);
      adjustHeight();
      adjustPadding();
      parentRef.current.classList.add("duration-75");
      childRef.current.classList.add("duration-75");
      return () => {
        screen.orientation.removeEventListener("change", adjustHeight);
      };
    } else {
      return () => {};
    }
  }, [mobile]);

  return (
    <>
      <style jsx>{`
        .relative {
          height: clamp(1.5em, 5vh, 2.25em);
          width: clamp(1.5em, 5vh, 2.25em);
        }
        .z-50 .parentRef {
          box-shadow: 0 0 0.75em rgb(216, 139, 235);
          border: 1px solid transparentRef;
          border-image: linear-gradient(45deg, #0b879380, #946a9080);
          border-image-slice: 1;
        }
        .z-50 .child {
          background-image: linear-gradient(
            45deg,
            #ffa2a2b0 0%,
            #bbc1bfb0 19%,
            #57c6e1b0 42%,
            #b49fdab0 79%,
            #7ac5d8b0 100%
          );
        }
      `}</style>
      <nav
        ref={navRef}
        className={`z-50 h-28 sticky top-0 py-10 pr-8 xs:pr-10 sm:pr-14 lg:pr-20 flex flex-row-reverse select-none pointer-events-none`}
      >
        <div
          className={`relative ${
            nav ? "opacity-100 duration-300" : "opacity-0 duration-700"
          } transition-opacity`}
        >
          <div
            ref={parentRef}
            onClick={toggleButtons}
            onTouchStart={(e) => {
              e.target.classList.add("group");
              e.target.classList.add("hover:scale-125");
              e.target.classList.add("hover:border-opacity-100");
            }}
            onTouchEnd={(e) => {
              e.target.classList.remove("group");
              e.target.classList.remove("hover:scale-125");
              e.target.classList.remove("hover:border-opacity-100");
            }}
            className={`
            ${nav ? "pointer-events-auto" : "pointer-events-none"} 
            group 
            parentRef 
            absolute 
            rounded-sm 
            cursor-pointer 
            rotate-45 
            h-full 
            w-full 
            border 
            border-gray-500 
            dark:border-gray-600 
            border-opacity-80 
            hover:scale-125 
            hover:border-opacity-100 
            transition-all
            ease-linear
          `}
          >
            <div
              ref={childRef}
              className={`
              child pointer-events-none 
              absolute 
              opacity-0 
              group-hover:opacity-100 
              rounded-sm 
              cursor-pointer 
              h-full 
              w-full 
              group-hover:border 
              group-hover:scale-50 
              group-hover:border-gray-500 
              group-hover:border-opacity-25 
              transition-all
              ease-linear
            `}
            />
          </div>
          {buttons !== undefined && (
            <div
              className={`${
                !buttons ? styles.close : styles.open
              } absolute h-full w-full flex flex-col items-center text-xs`}
            >
              <NavButton
                className="fas fa-earth-americas"
                // onClick={redirectHome}
              />
              <NavButton
                className="fas fa-newspaper"
                // onClick={() => toggleModal("apps")}
              />
              <NavButton
                className="fas fa-user"
                //onClick={redirectHome}
              />
              <NavButton
                className="fa-solid fa-comment"
                // onClick={() => toggleModal("notes")}
                setNotifications={setNotifications}
                notifications={3}
              />
              <NavButton
                className="fas fa-bell"
                // onClick={() => toggleModal("contact")}
                setNotifications={setNotifications}
                notifications={2}
              />
              <NavButton className="fas fa-gear" onClick={logout} />
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
