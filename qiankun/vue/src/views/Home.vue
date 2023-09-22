<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Vue.js Demo" />

    <el-button @click="dialogVisible = true" type="text">Open Dialog</el-button>
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <el-dialog :before-close="handleClose" :visible.sync="dialogVisible" title="Dialog" width="30%">
      <span>dialog message</span>
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">cancel</el-button>
        <el-button @click="dialogVisible = false" type="primary">ok</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      dialogVisible: false,
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("Sure to close？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>
