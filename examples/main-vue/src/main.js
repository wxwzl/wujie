import "whatwg-fetch"; // fetch polyfill
import "custom-event-polyfill";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import WujieVue from "wujie-vue2";
import hostMap from "./hostMap";
import credentialsFetch from "./fetch";
import Switch from "ant-design-vue/es/switch";
import Tooltip from "ant-design-vue/es/tooltip";
import button from "ant-design-vue/es/button/index";
import Icon from "ant-design-vue/es/icon/index";
import "ant-design-vue/es/button/style/index.css";
import "ant-design-vue/es/style/index.css";
import "ant-design-vue/es/switch/style/index.css";
import "ant-design-vue/es/tooltip/style/index.css";
import "ant-design-vue/es/icon/style/index.css";
import lifecycles from "./lifecycle";
import plugins from "./plugin";

const isProduction = process.env.NODE_ENV === "production";
const { setupApp, preloadApp, bus } = WujieVue;
Vue.use(WujieVue).use(Switch).use(Tooltip).use(button).use(Icon);

Vue.config.productionTip = false;

bus.$on("click", (msg) => window.alert(msg));

// 在 xxx-sub 路由下子应用将激活路由同步给主应用，主应用跳转对应路由高亮菜单栏
bus.$on("sub-route-change", (name, path) => {
  const mainName = `${name}-sub`;
  const mainPath = `/${name}-sub${path}`;
  const currentName = router.currentRoute.name;
  const currentPath = router.currentRoute.path;
  if (mainName === currentName && mainPath !== currentPath) {
    router.push({ path: mainPath });
  }
});

const degrade = window.localStorage.getItem("degrade") === "true" || !window.Proxy || !window.CustomElementRegistry;
const props = {
  jump: (name) => {
    router.push({ name });
  },
};
/**
 * 大部分业务无需设置 attrs
 * 此处修正 iframe 的 src，是防止github pages csp报错
 * 因为默认是只有 host+port，没有携带路径
 */
const attrs = isProduction ? { src: hostMap("//localhost:8000/") } : {};
/**
 * 配置应用，主要是设置默认配置
 * preloadApp、startApp的配置会基于这个配置做覆盖
 */
setupApp({
  name: "react16",
  url: hostMap("//localhost:7600/"),
  attrs,
  exec: true,
  props,
  fetch: credentialsFetch,
  plugins,
  prefix: { "prefix-dialog": "/dialog", "prefix-location": "/location" },
  degrade,
  ...lifecycles,
});

setupApp({
  name: "react17",
  url: hostMap("//localhost:7100/"),
  attrs,
  exec: true,
  alive: true,
  props,
  fetch: credentialsFetch,
  degrade,
  ...lifecycles,
});

setupApp({
  name: "vue2",
  url: hostMap("//localhost:7200/"),
  attrs,
  exec: true,
  props,
  fetch: credentialsFetch,
  degrade,
  // 在safari浏览器 有时候可以，有时候不可以。不可以的时候我看节点，这些插件都没有执行，可以的时候safari浏览器贼卡，控制台都打不开
  plugins: [
    {
      jsBeforeLoaders: [
        {
          callback: (appWindow) => {
            console.log("hello0000000",appWindow)
          },
        },
      ],
    },
    {
      jsBeforeLoaders: [
        {
          callback: (appWindow) => {
            Object.defineProperties(appWindow, {
              Selection: {
                get: () => {
                  console.log(appWindow.__WUJIE?.degrade, "appWindow.__WUJIE?.degrade");
                  return appWindow.__WUJIE?.degrade
                    ? appWindow.__WUJIE.document.defaultView.Selection
                    : appWindow.parent.Selection;
                },
              },
              DataTransfer: {
                get: () => {
                  console.log(appWindow.__WUJIE?.degrade, "appWindow.__WUJIE?.degrade");
                  return appWindow.__WUJIE?.degrade
                    ? appWindow.__WUJIE.document.defaultView.DataTransfer
                    : appWindow.parent.DataTransfer;
                },
              },
            });
          },
        },
      ],
    },
    {
      jsLoader: (code) => {
        const newCode = code
          .replace("e instanceof t.Node", "e instanceof (window.__WUJIE?.degrade ? window.Node : t.Node)")
          .replace("n.isCollapsed", "n.baseOffset === n.focusOffset")
          .replace("n.collapsed", "n.startOffset === n.endOffset");
          console.log(newCode)
        return newCode;
      },
    },
    // {
    //   jsBeforeLoaders: [
    //     {
    //       callback: (appWindow) => {
    //         Object.defineProperties(appWindow, {
    //           Selection: {
    //             get: () => appWindow.__WUJIE.document.defaultView.Selection,
    //           },
    //           DataTransfer: {
    //             get: () => appWindow.__WUJIE.document.defaultView.DataTransfer,
    //           },
    //         });
    //       },
    //     },
    //   ],
    //   jsLoader: (code) => {
    //     return code
    //       .replace("!!t&&e instanceof t.Node", " e !=null&&typeof e.nodeType === 'number'")
    //       .replace("n.isCollapsed", "n.baseOffset === n.focusOffset")
    //       .replace("n.collapsed", "n.startOffset === n.endOffset");
    //   },
    // },
  ],
  // plugins: [
  //   {
  //     jsBeforeLoaders: [
  //       {
  //         content:
  //           "window.Selection = window.parent.Selection; window.DataTransfer = window.parent.DataTransfer;document.caretPositionFromPoint=null;",
  //       },
  //     ],
  //   },
  //   {
  //     jsLoader: (code) => {
  //       return code
  //         .replace("n.isCollapsed", "n.baseOffset === n.focusOffset")
  //         .replace("n.collapsed", "n.startOffset === n.endOffset");
  //     },
  //   },
  // ],
  ...lifecycles,
});

setupApp({
  name: "vue3",
  url: hostMap("//localhost:7300/"),
  attrs,
  exec: true,
  alive: true,
  plugins: [{ cssExcludes: ["https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"] }],
  props,
  // 引入了的第三方样式不需要添加credentials
  fetch: (url, options) =>
    url.includes(hostMap("//localhost:7300/")) ? credentialsFetch(url, options) : window.fetch(url, options),
  degrade,
  ...lifecycles,
});

setupApp({
  name: "angular12",
  url: hostMap("//localhost:7400/"),
  attrs,
  exec: true,
  props,
  fetch: credentialsFetch,
  degrade,
  ...lifecycles,
});

setupApp({
  name: "vite",
  url: hostMap("//localhost:7500/"),
  attrs,
  exec: true,
  props,
  fetch: credentialsFetch,
  degrade,
  ...lifecycles,
});

if (window.localStorage.getItem("preload") !== "false") {
  preloadApp({
    name: "react16",
  });
  preloadApp({
    name: "react17",
  });
  preloadApp({
    name: "vue2",
  });
  preloadApp({
    name: "angular12",
  });
  if (window.Proxy) {
    preloadApp({
      name: "vue3",
    });
    preloadApp({
      name: "vite",
    });
  }
}

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
