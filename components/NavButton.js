import { useRef } from "react";

// context
import _appContext from "../context/_appContext";

const NavButton = ({ className, onClick }) => {
  const i = useRef();

  return (
    <>
      <style jsx>{`
        @media (max-height: 700px) {
          .text-md {
            font-size: 0.75rem;
          }
        }
        @media (max-height: 600px) {
          .text-md {
            font-size: 0.6rem;
          }
        }
        @media (max-height: 500px) {
          .text-md {
            font-size: 0.5rem;
          }
        }
        .hover:hover {
          box-shadow: 0 0 1em white;
          background-color: white;
        }
      `}</style>
      <div
        className={`
          shadow-xl
          bg-white/75
          transition
          ease-linear
          pointer-events-auto
          cursor-pointer 
          absolute
          h-full 
          w-full
          rounded-full
        `}
      >
        <i
          ref={i}
          onClick={onClick}
          onTouchStart={(e) => {
            e.target.classList.add("hover");
          }}
          onTouchEnd={(e) => {
            e.target.classList.remove("hover");
          }}
          className={`
            ${className}
            hover
            h-full 
            w-full 
            flex 
            justify-center 
            items-center 
            text-md
            rounded-full
            transition-all
            ease-linear
            shadow-xl
          `}
        />
      </div>
    </>
  );
};

export default NavButton;
