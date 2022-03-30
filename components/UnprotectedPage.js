import { useContext } from "react";

// components
import NotLoggedInHeader from "./NotLoggedInHeader";

// context
import _appContext from "../context/_appContext";

const UnprotectedPage = ({ children }) => {
  const { user_id, router } = useContext(_appContext);

  return (
    <div className="absolute top-0 h-screen w-full flex flex-col justify-start bg-black">
      {!user_id && !["/login", "/register"].includes(router.route) && (
        <NotLoggedInHeader />
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default UnprotectedPage;
