import "../styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";

// Store
import { Provider, useSelector } from "react-redux";
import { persistor, store } from "../store/store.js";
import { PersistGate } from "redux-persist/integration/react";

// Libraries
import { useEffect, useState } from "react";

// Components
import Nav from "../components/Nav/Nav";

// Constants
import { NAV } from "../constants/nav";

// Services
import { AuthService } from "../services/Auth.service";
import { selectUserIdToken } from "../store/states/userSlice";
import Spinner from "../components/Spinners/Spinner";

export function reportWebVitals(metric) {
  console.info(metric);
}

const RouteWrapper = ({ children }) => {
  const Auth = new AuthService();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const userIdToken = useSelector(selectUserIdToken);
  const [currentIdToken, setCurrentIdToken] = useState(
    store.getState("user").user.idToken
  );

  const checkLoggedIn = async (token) => {
    const verified = await Auth.checkLoggedIn(token);
    setLoggedIn(verified ? true : false);
    Auth.manageRoute(verified ? true : false);
    setLoading(false);
  };

  useEffect(() => {
    import("preline");
    const idToken = store.getState("user").user.idToken;
    console.log({ idToken, currentIdToken });
    if (idToken !== currentIdToken || !idToken) {
      setLoading(true);
      if (idToken) {
        checkLoggedIn(idToken);
      } else {
        Auth.manageRoute(false);
        setLoggedIn(false);
        setLoading(false);
      }
    } else {
      setLoading(true);
    }
    setCurrentIdToken(idToken);
  }, [userIdToken]);

  return (
    <div>
      {loading ? (
        <div className="h-[100vh] w-[100vw]">
          <Spinner />
        </div>
      ) : (
        <>
          {loggedIn ? (
            <Nav sideNavOptions={NAV}>{children}</Nav>
          ) : (
            <div className="bg-white text-black p-10 min-h-[100vh]">
              {children}
            </div>
          )}
        </>
      )}
    </div>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <RouteWrapper>
            <Component {...pageProps} />
          </RouteWrapper>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
