import "react-app-polyfill/stable";
import "react-app-polyfill/ie11";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";

const basename = window.__POWERED_BY_QIANKUN__ ? "/react16" : "/";

function render(props) {
  const { container } = props;
  ReactDOM.render(
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>,
    container ? container.querySelector("#root") : document.querySelector("#root")
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log("[react16] react app bootstraped");
}

export async function mount(props) {
  console.log("[react16] props from main framework", props);
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector("#root") : document.querySelector("#root"));
}
