<template>
  <div id="app">
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: "App",
  data() {
    return {
      color: "1",
      count: 0,
      deviceCols: ["设备名称", "设备数量", "是否可用", "操作"],
      single: {
        name: "",
        num: "",
        statu: "",
      },
      phones: [
        {
          name: "华为手机",
          num: 10,
          statu: 0,
        },
        {
          name: "苹果手机",
          num: 10,
          statu: 1,
        },
        {
          name: "小米手机",
          num: 0,
          statu: 1,
        },
      ],
      totalVisible: true,
      countVisible: true,
      index: -1,
      formVisible: false,
      users: [
        {
          name: "张三",
          num: 10,
          device: "小米手机",
        },
        {
          name: "李四",
          num: 2,
          device: "苹果手机",
        },
        {
          name: "王五",
          num: 1,
          device: "",
        },
      ],
    };
  },
  created() {
    this.setCount();
  },
  computed: {
    total() {
      return this.phones.reduce((total, item) => total + item.num, 0);
    },
  },
  watch: {
    phones: {
      handler(newv, oldv) {
        console.log(newv, oldv);
        this.setCount();
      },
      deep: true,
    },
  },
  methods: {
    closeFormOption() {
      this.index = -1;
      this.formVisible = false;
    },
    sumitFormOption(data) {
      this.index >= 0
        ? this.phones.splice(this.index, 1, data)
        : this.phones.push({
            name: this.single.name,
            num: this.single.num,
            statu: this.single.statu,
          });
    },
    delFormOption(data) {
      this.phones.splice(data, 1);
    },
    openFormOption(item, index) {
      console.log(item, index);
      this.formVisible = true;
      this.single = item;
      this.index = index;
    },
    borrowDevice(data) {
      console.log("借用", data);
      let info = this.phones.filter(item => {
        return item.name === data.device;
      });
      if (info.length > 0) {
        if (info[0].statu === 1) {
          if (info[0].num > 0) {
            this.phones.map(item => {
              if (item.name === data.device) {
                item.num -= 1;
              }
              return item;
            });
            this.users.map(item => {
              if (item.device === data.device) {
                item.num += 1;
              }
            })
          } else {
            this.say(`${data.device}设备可借用为数量为0!`);
          }
        }else {
          this.say(`${data.device}设备不可借用!`);
        }
      } else {
        this.say(`${data.device}设备不存在!`);
      }
    },
    say(data) {
      this.$message({
        message: data,
        type: 'warning'
      });
    },
    setCount() {
      this.count = this.phones.reduce(
        (t, item) => t + item.num * item.statu,
        0
      );
    },
    add() {
      this.formVisible = true;
      this.single = {
        name: "",
        num: "",
        statu: "",
      };
    },

    conceal() {
      this.totalVisible = !this.totalVisible;
    },
    concealData() {
      this.countVisible = !this.countVisible;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
