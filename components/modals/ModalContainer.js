import { useState } from "react";
import { createPortal } from "react-dom";

// components
// import ExitButton from './ExitButton'

const Modal = ({
  children,
  background = true,
  blur = true,
  setModal = () => {},
  exitBtn = true,
}) => {
  const [__body] = useState(document.body);
  const [__next] = useState(document.getElementById("__next"));

  const exit = () => {
    setModal(null);
  };

  return createPortal(
    <>
      <style jsx>{`
        .modal-container {
          position: relative;
          min-height: 325px;
          max-height: 450px;
          width: 95%;
          max-width: 500px;
          border-radius: 20px;
          background-color: #fff4;
          backdrop-filter: ${blur ? "blur(10px)" : "none"};
        }
      `}</style>
      <div
        className={`modal-scroll fixed h-screen w-full top-0 flex justify-center items-center z-50 ${
          background ? "bg-black/50" : ""
        }`}
      >
        {setModal ? (
          <>
            <div
              className="absolute top-0 left-0 w-full h-full"
              onClick={() => {
                setModal(null);
              }}
            />
          </>
        ) : (
          <>
            <div className="absolute top-0 left-0 w-full h-full" />
          </>
        )}
        <div className="modal-container animate-fade-in overflow-hidden">
          {/* <ExitButton visable={exitBtn} exit={exit} size={25} padding={10} /> */}
          {children}
        </div>
      </div>
    </>,
    __next
  );
};

export default Modal;
