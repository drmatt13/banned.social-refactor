import { useContext } from "react";

// components
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";

// context
import _appContext from "../context/_appContext";

const Layout = ({ children }) => {
  const { loading, user } = useContext(_appContext);

  return (
    <div className="relative h-screen w-screen flex flex-col justify-start overflow-y-auto">
      {loading ? (
        <Loading />
      ) : (
        <>
          {user && <Navbar />}
          <div className="flex-1">{children}</div>
        </>
      )}
    </div>
  );
};

export default Layout;
