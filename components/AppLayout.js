import { useContext } from "react";
import Link from "next/link";

// components
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";

// context
import _appContext from "../context/_appContext";

const Layout = ({ children }) => {
  const { loading, user_id } = useContext(_appContext);

  return (
    <div className="relative h-screen w-screen flex flex-col justify-start bg-black overflow-y-auto">
      {loading ? (
        <Loading />
      ) : (
        <>
          {user_id && <Navbar />}
          <div className="flex-1">{children}</div>
        </>
      )}
      {/* Button that shows website design */}
      <Link href="/design.png">
        <div className="select-none absolute bottom-10 right-10 py-4 px-8 rounded-md border border-sky-500/75 shadow cursor-pointer bg-sky-500 hover:bg-sky-400 text-gray-200 hover:text-white transition-all hover:shadow-lg">
          Website Design, Click Here
        </div>
      </Link>
      {/* Button that shows website design */}
    </div>
  );
};

export default Layout;
