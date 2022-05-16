import { useContext } from "react";

// components
import NotLoggedInHeader from "./NotLoggedInHeader";
import EditUsername from "./EditUsername";
import EditAvatar from "./modals/EditAvatar";

// context
import _appContext from "../context/_appContext";

const UnprotectedPage = ({ children }) => {
  const { user, router } = useContext(_appContext);

  return (
    <div className="flex-1 flex flex-col">
      {!user._id && !["/login", "/register"].includes(router.route) && (
        <NotLoggedInHeader />
      )}
      <>
        {!user?.username ? (
          <div className="h-full w-full flex justify-center items-center">
            <EditUsername placeholder="set username" />
          </div>
        ) : (
          <>
            {!user?.avatar ? (
              <div className="h-full w-full flex justify-center items-center">
                <EditAvatar background={false} blur={false} />
              </div>
            ) : (
              <>{children}</>
            )}
          </>
        )}
      </>
      {/* <div className="flex-1">{children}</div> */}
    </div>
  );
};

export default UnprotectedPage;
