import { useState, useContext, useLayoutEffect } from "react";

// components
import Loading from "./Loading";

// context
import _appContext from "../context/_appContext";

const ProtectedPage = ({ children }) => {
  const { logout, router, user } = useContext(_appContext);

  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    if (!user) logout(router.route);
    else setLoading(false);
  }, [setLoading, user, router.route, logout]);

  return loading ? (
    <div className="h-full w-full flex justify-center items-center">
      <Loading />
    </div>
  ) : (
    <>{children}</>
  );
};

export default ProtectedPage;
