<template>
  <div>
    <HelloWorld msg="Vue2示例"></HelloWorld>
    <div class="content" style="text-align: center;" id="home">
      <p >
        当前vue版本
        <el-tag style="vertical-align: text-top;" size="small">2.6.11</el-tag>
      </p>
      <p>
        当前element版本
        <el-tag style="vertical-align: text-top;" size="small">2.15.6</el-tag>
      </p>
      <p>
        当前ant-design-vue版本
        <el-tag style="vertical-align: text-top;" size="small">1.7.8</el-tag>
      </p>
      <p>
        <el-button @click="open('https://github.com/Tencent/wujie/tree/master/examples/vue2')">仓库地址</el-button>
      </p>
      <div class="page-right">
        <!-- 编辑器 DOM -->
        <div style="border: 1px solid #ccc;">
          <div id="editor-toolbar" style="border-bottom: 1px solid #ccc;"></div>
          <div id="editor-text-area" style="height: 500px;"></div>
        </div>

        <!-- 内容状态 -->
        <p style="background-color: #f1f1f1;">
          Text length: <span id="total-length"></span>； Selected text length: <span id="selected-length"></span>；
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  data() {
    return {
      open: window.open,
    };
  },
  components: {
    HelloWorld,
  },
  mounted() {
    /* eslint-disable */
    const E = window.wangEditor;

    const LANG = location.href.indexOf("lang=en") > 0 ? "en" : "zh-CN";
    E.i18nChangeLanguage(LANG); // 切换语言

    // Extend menu
    class MyMenu {
      constructor() {
        this.title = "My menu";
        // this.iconSvg = '<svg >...</svg>'
        this.tag = "button";
      }
      getValue(editor) {
        return " hello ";
      }
      isActive(editor) {
        return false; // or true
      }
      isDisabled(editor) {
        return false; // or true
      }
      exec(editor, value) {
        editor.insertText(value); // value 即 this.getValue(editor) 的返回值
      }
    }
    const myMenuConf = {
      key: "myMenu",
      factory() {
        return new MyMenu();
      },
    };
    E.Boot.registerMenu(myMenuConf);

    window.editor = E.createEditor({
      selector: "#editor-text-area",
      html: "<p><br></p>",
      config: {
        placeholder: "Type here...",
        MENU_CONF: {
          uploadImage: {
            fieldName: "your-fileName",
            base64LimitSize: 10 * 1024 * 1024, // 10M 以下插入 base64
          },
        },
        onChange(editor) {
          console.log(editor.getHtml());

          // 选中文字
          const selectionText = editor.getSelectionText();
          document.getElementById("selected-length").innerHTML = selectionText.length;
          // 全部文字
          const text = editor.getText().replace(/\n|\r/gm, "");
          document.getElementById("total-length").innerHTML = text.length;
        },
      },
    });

    window.toolbar = E.createToolbar({
      editor,
      selector: "#editor-toolbar",
      config: {
        insertKeys: {
          index: 0,
          keys: ["myMenu"], // show menu in toolbar
        },
      },
    });
  },
};
</script>

<style>
#home p{
  color:var(--primaryColor)
}
:root {
  --host-color: #f16b5f;
}
</style>
