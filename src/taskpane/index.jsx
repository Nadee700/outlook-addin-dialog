import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { AppContainer } from "react-hot-loader";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { HashRouter } from "react-router-dom";
import * as ReactDOM from "react-dom";
import { AppProvider } from "../context/AppContext";
/* global document, Office, module, require */

// initializeIcons();

let isOfficeInitialized = false;

const title = "OAS365 Outlook Add-in";

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <HashRouter>
        <AppProvider>
          <Component title={title} isOfficeInitialized={isOfficeInitialized} />
        </AppProvider>
      </HashRouter>
    </AppContainer>,
    document.getElementById("container")
  );
};

/* Render application after Office initializes */
Office.onReady(() => {
  isOfficeInitialized = true;
  render(App);
});

/* Initial render showing a progress bar */
render(App);

if (module.hot) {
  module.hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    render(NextApp);
  });
}
