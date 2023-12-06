import React from "react";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import Dialog from "./Dialog";
import Font from "./Font";
import logo from "./logo.svg";
import Tag from "antd/es/tag";
import Button from "antd/es/button";
import "antd/es/tag/style/css";
import "antd/es/button/style/css";
import "antd/es/modal/style/css";
import "antd/es/select/style/css";
import "antd/es/popover/style/css";

const Home = () => (
  <div>
    <h2 className="css-before-flag">react16示例</h2>
    <p>
      当前react版本{" "}
      <Tag style={{ verticalAlign: "text-top" }} color="blue">
        16.13.1
      </Tag>
    </p>
    <p>
      当前antd版本{" "}
      <Tag style={{ verticalAlign: "text-top" }} color="geekblue">
        4.18.3
      </Tag>
    </p>
    <p>
      <Button onClick={() => window.open("https://github.com/Tencent/wujie/tree/master/examples/react16")}>
        仓库地址
      </Button>
    </p>
  </div>
);

export default function App() {
  return (
    <div>
      <nav>
        <NavLink to="/home">首页</NavLink> | <NavLink to="/dialog">弹窗</NavLink> |{" "}
       <NavLink to="/font">字体</NavLink>
      </nav>

      <div>
        <img src={logo} className="App-logo" alt="logo" />
      </div>

      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route path="/dialog">
          <Dialog />
        </Route>
        <Route path="/font">
          <Font />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </div>
  );
}
