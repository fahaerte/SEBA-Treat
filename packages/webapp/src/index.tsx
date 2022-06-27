import React, { Component } from "react";
import "reflect-metadata";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app/app.scss";
import CustomThemeProvider from "./assets/theme/CustomThemeProvider";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { AppRouter } from "./app/router";
import { BrowserRouter } from "react-router-dom";

/**
 * TODO:
 * - Authenticator
 * - Installation and usage of lib-common, (API implementation)
 */

class Root extends Component {
  render() {
    return (
      <div className="app docuply h-100">
        <Provider store={store}>
          <CustomThemeProvider>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </CustomThemeProvider>
        </Provider>
      </div>
    );
  }
}
export default Root;

render(<Root />, document.getElementById("root"));

if (module.hot) {
  // https://github.com/webpack/webpack/issues/418#issuecomment-53398056
  module.hot.accept((err) => {
    if (err) console.error(err.message); // eslint-disable-line no-console
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
