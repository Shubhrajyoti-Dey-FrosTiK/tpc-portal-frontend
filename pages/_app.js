import "../styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";

// Store
import { Provider } from "react-redux";
import { persistor, store } from "../store/store.js";

// Libraries
import { useEffect } from "react";

// Components
import Nav from "../components/Nav/Nav";

// Constants
import { NAV } from "../constants/nav";
import { PersistGate } from "redux-persist/integration/react";

export function reportWebVitals(metric) {
  console.log(metric);
}

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("preline");
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Nav sideNavOptions={NAV}>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </Nav>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
