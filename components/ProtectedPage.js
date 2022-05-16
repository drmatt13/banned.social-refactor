import { useState, useContext, useLayoutEffect } from "react";

// components
import Loading from "./Loading";
import Login from "./Login";
import EditUsername from "./EditUsername";
import EditAvatar from "./modals/EditAvatar";

// context
import _appContext from "../context/_appContext";

const ProtectedPage = ({ children }) => {
  const { logout, loggingOut, router, user } = useContext(_appContext);

  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(false);

  // logout();

  useLayoutEffect(() => {
    // FIX REROUTE
    // if (!user) logout(router.route);
    if (!user) setLogin(true);
    setLoading(false);
  }, [setLoading, user, router.route, logout]);

  return loading || loggingOut ? (
    <div className="h-full w-full">
      <Loading />
    </div>
  ) : (
    <>
      {login ? (
        <Login />
      ) : (
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
                children
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProtectedPage;
