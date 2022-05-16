import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Cookie from "js-cookie";
import { SessionProvider, signOut } from "next-auth/react";

// components
import AppLayout from "../components/AppLayout";

// custom hooks
import useAvatars from "../hooks/useAvatars";
import useCredentials from "../hooks/useCredentials";
import useNotifications from "../hooks/useNotifications";

// global context
import _appContext from "../context/_appContext";

// global styles
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const { loading, user, setUser } = useCredentials();
  const { avatars } = useAvatars();
  // const { messages, updateMessages } = useMessages();
  const { messages, notifications, updateNotifications } = useNotifications();

  // logging out process for ProtectedRoute component
  const [loggingOut, setLoggingOut] = useState(false);

  const [mobile] = useState(
    typeof window !== "undefined"
      ? /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      : null
  );

  const logout = async (href) => {
    Cookie.remove("token");
    Cookie.remove("next-auth.session-token");
    Cookie.remove("next-auth.callback-url");
    Cookie.remove("next-auth.csrf-token");
    setUser(null);
    setLoggingOut(true);
    signOut({ redirect: false });
    await router.push(
      `/login${
        typeof href === "string"
          ? href === "/"
            ? ""
            : `?redirect=${href}`
          : ""
      }`
    );
    setLoggingOut(false);
  };

  // logout();

  return (
    <>
      <Head>
        <title>Next.js | Tailwind | Auth</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,user-scalable=no"
        />
        <link rel="apple-touch-icon" href="/icon.png" />
        {/* Android status bar color */}
        {/* <meta name="theme-color" content={darkMode ? "#7d54ed" : "#f33984"} /> */}
        {/* Apple status bar color */}
        <meta
          name="apple-mobile-web-app-status-bar-style"
          // content={darkMode ? "black" : "white"}
        />
        {/* Enable Apple fullscreen */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        {/* Open Graph */}
        <meta property="og:url" content="" />
        <meta property="og:site_name" content="" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
        <meta
          property="og:image"
          content="https://next-tailwind-userauth-boilerplate.vercel.app/og_image.webp"
        />
      </Head>
      <SessionProvider session={pageProps.session}>
        <_appContext.Provider
          value={{
            avatars,
            loading,
            logout,
            loggingOut,
            mobile,
            router,
            user,
            setUser,
          }}
        >
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </_appContext.Provider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
