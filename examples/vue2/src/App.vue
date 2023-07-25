<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">首页</router-link> | <router-link to="/dialog">弹窗</router-link> |
      <router-link to="/location">路由</router-link> | <router-link to="/communication">通信</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  watch: {
    // 在 vue2-sub 路由下主动告知主应用路由跳转，主应用也跳到相应路由高亮菜单栏
    $route() {
      window.$wujie?.bus.$emit("sub-route-change", "vue2", this.$route.path);
    },
  },
};
</script>
<style>
#app {
  --primaryColor: #507afe;
  --navBackgroundColor: #272b34;
  --navActiveBackgroundColor: #507afe;
  --navFontColor: #aebace;
  --navActiveFontColor: #ffffff;
  --sideMenuBackgroundColor: #ffffff;
  --sideMenuActiveBackgroundColor: #eef2ff;
  --sideMenuFontColor: #222222;
  --sideMenuActiveFontColor: #507afe;
  --primaryHoverColor: #7395fe;
  --primaryActiveColor: #486ee5;
  --primaryColorFade8: rgba(80, 122, 254, 0.08);
  --primaryColorFade10: rgba(80, 122, 254, 0.1);
  --primaryColorFade12: rgba(80, 122, 254, 0.12);
  --primaryColorFade20: rgba(80, 122, 254, 0.2);
  --primaryColorFade30: rgba(80, 122, 254, 0.3);
  --primaryColorFade40: rgba(80, 122, 254, 0.4);
  --primaryColorFade50: rgba(80, 122, 254, 0.5);
  --navUserBackgroundColor: #0440fe;
}
#app{
  --primaryColor: #507;
}
</style>
