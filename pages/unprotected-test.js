import { useContext } from "react";
import Link from "next/link";

// components
import UnprotectedPage from "../components/UnprotectedPage";

// context
import _appContext from "../context/_appContext";

const Unprotected = () => {
  const { logout } = useContext(_appContext);

  return (
    <UnprotectedPage>
      <div className="h-full w-full flex flex-col justify-center items-center animate-fade-in">
        <Link href="/">
          <a className="mb-2 text-blue-500 hover:underline hover:text-purple-500">
            Return Home
          </a>
        </Link>
      </div>
    </UnprotectedPage>
  );
};

export default Unprotected;
