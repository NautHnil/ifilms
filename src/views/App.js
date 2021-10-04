import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Switcher from "./includes/switcher";
import ConfigContextProvider from "../contexts/configContext";
import Header from "./includes/header";
import Footer from "./includes/footer";

export default function App() {
  return (
    <ConfigContextProvider>
      <HelmetProvider>
        <div id={`site`}>
          <Router>
            <Header />

            <main id={`site-main`} role="main">
              <Switcher />
            </main>

            <Footer />
          </Router>
        </div>
      </HelmetProvider>
    </ConfigContextProvider>
  );
}
