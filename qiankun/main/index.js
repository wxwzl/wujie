import "zone.js"; // for angular subapp
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from "qiankun";
import "./index.less";

/**
 * 主应用 **可以使用任意技术栈**
 * 以下分别是 React 和 Vue 的示例，可切换尝试
 */
import render from "./render/ReactRender";
// import render from './render/VueRender';

/**
 * Step1 初始化应用（可选）
 */
render({ loading: true });

const loader = (loading) => render({ loading });

/**
 * Step2 注册子应用
 */

registerMicroApps(
  [
    {
      name: "purehtml",
      entry: "//localhost:9001",
      container: "#subapp-viewport",
      loader,
      activeRule: "/purehtml",
    },
    {
      name: "react16",
      entry: "//localhost:9002",
      container: "#subapp-viewport",
      loader,
      activeRule: "/react16",
    },
    {
      name: "vue",
      entry: "//localhost:9003",
      container: "#subapp-viewport",
      loader,
      activeRule: "/vue",
    },
    {
      name: "angular9",
      entry: "//localhost:9005",
      container: "#subapp-viewport",
      loader,
      activeRule: "/angular9",
    },

    {
      name: "vue3",
      entry: "//localhost:9007",
      container: "#subapp-viewport",
      loader,
      activeRule: "/vue3",
    },
    {
      name: "react17",
      entry: "//localhost:9015",
      container: "#subapp-viewport",
      loader,
      activeRule: "/react17",
    },
    {
      name: "react18",
      entry: "//localhost:9011",
      container: "#subapp-viewport",
      loader,
      activeRule: "/react18",
    },
  ],
  {
    beforeLoad: [
      (app) => {
        console.log("[LifeCycle] before load %c%s", "color: green;", app.name);
      },
    ],
    beforeMount: [
      (app) => {
        console.log("[LifeCycle] before mount %c%s", "color: green;", app.name);
      },
    ],
    afterUnmount: [
      (app) => {
        console.log("[LifeCycle] after unmount %c%s", "color: green;", app.name);
      },
    ],
  }
);

const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: "qiankun",
});

onGlobalStateChange((value, prev) => console.log("[onGlobalStateChange - master]:", value, prev));

setGlobalState({
  ignore: "master",
  user: {
    name: "master",
  },
});

/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp("/react16");

/**
 * Step4 启动应用
 */
start();

runAfterFirstMounted(() => {
  console.log("[MainApp] first app mounted");
});