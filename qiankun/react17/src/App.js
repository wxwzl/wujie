import logo from "./logo.svg";
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from "react-router-dom";
import Dialog from "./Dialog";
import Tag from "antd/es/tag";
import Button from "antd/es/button";
import "antd/es/tag/style/css";
import "antd/es/button/style/css";
import "antd/es/modal/style/css";
import "antd/es/select/style/css";
import "antd/es/popover/style/css";

const basename = window.__POWERED_BY_QIANKUN__ ? "/react17" : "/";

const Home = () => (
  <div>
    <h2>react17示例</h2>
    <p>
      当前react版本{" "}
      <Tag style={{ verticalAlign: "text-top" }} color="blue">
        17.0.2
      </Tag>
    </p>
    <p>
      当前antd版本{" "}
      <Tag style={{ verticalAlign: "text-top" }} color="geekblue">
        4.18.3
      </Tag>
    </p>
    <p>
      <Button onClick={() => window.open("https://github.com/Tencent/wujie/tree/master/examples/react17")}>
        仓库地址
      </Button>
    </p>
  </div>
);

function Nav() {
  return (
    <nav>
      <NavLink to="/home">首页</NavLink> | <NavLink to="/dialog">弹窗</NavLink> 
    </nav>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router basename={basename}>
          <div>
            <Nav />
            <img src={logo} className="App-logo" alt="logo" />
            <Switch>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route path="/dialog">
                <Dialog />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
