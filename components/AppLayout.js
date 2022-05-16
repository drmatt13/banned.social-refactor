import { useContext, useState } from "react";

// components
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";

// context
import _appContext from "../context/_appContext";

const Layout = ({ children }) => {
  const { loading, user } = useContext(_appContext);

  const [buttons, setButtons] = useState();
  const [modal, setModal] = useState();
  const [nav, setNav] = useState(true);

  const toggleModal = (x) => {
    if (x) setNav(false);
    else {
      setNav(true);
      setModal(null);
      return null;
    }
    setModal(x);
    setButtons(false);
  };

  return (
    <div className="relative h-screen w-screen flex flex-col justify-start overflow-y-auto">
      {loading ? (
        <Loading />
      ) : (
        <>
          {user?.username && user?.avatar && (
            <>
              <Navbar
                nav={nav}
                buttons={buttons}
                setButtons={setButtons}
                setModal={setModal}
                toggleModal={toggleModal}
              />
              {/* <div className="h-16 w-full bg-blue-400 sticky top-0" /> */}
            </>
          )}
          <div className="absolute top-0 left-0 right-0 bottom-0">
            {children}
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;
