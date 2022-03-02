<!--  -->
<template>
  <div>
    <ul id="container"></ul>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
      //时间分片方式
      //虚拟列表方式
    // this.allin();
    // this.pageloop();
    // this.requestAnimationFrameFun();
    // this.byFragment();
  },
  methods: {
    allin() {
      // 记录任务开始时间
      let now = Date.now();
      // 插入十万条数据
      const total = 100000;
      // 获取容器
      let ul = document.getElementById("container");
      // 将数据插入容器中
      for (let i = 0; i < total; i++) {
        let li = document.createElement("li");
        li.innerText = ~~(Math.random() * total);
        ul.appendChild(li);
      }

      console.log("JS运行时间：", Date.now() - now);
      setTimeout(() => {
        console.log("总运行时间：", Date.now() - now);
      }, 0);
    },
    pageloop() {
      //需要插入的容器
      let ul = document.getElementById("container");
      // 插入十万条数据
      let total = 100000;
      // 一次插入 20 条
      let once = 20;
      //总页数
      let page = total / once;
      //每条记录的索引
      let index = 0;
      //循环加载数据
      function loop(curTotal, curIndex) {
        if (curTotal <= 0) {
          return false;
        }
        //每页多少条
        let pageCount = Math.min(curTotal, once);
        setTimeout(() => {
          for (let i = 0; i < pageCount; i++) {
            let li = document.createElement("li");
            li.innerText = curIndex + i + " : " + ~~(Math.random() * total);
            ul.appendChild(li);
          }
          loop(curTotal - pageCount, curIndex + pageCount);
        }, 0);
      }
      loop(total, index);
    },
    requestAnimationFrameFun() {
      //需要插入的容器
      let ul = document.getElementById("container");
      // 插入十万条数据
      let total = 100000;
      // 一次插入 20 条
      let once = 20;
      //总页数
      let page = total / once;
      //每条记录的索引
      let index = 0;
      //循环加载数据
      function loop(curTotal, curIndex) {
        if (curTotal <= 0) {
          return false;
        }
        //每页多少条
        let pageCount = Math.min(curTotal, once);
        window.requestAnimationFrame(function () {
          for (let i = 0; i < pageCount; i++) {
            let li = document.createElement("li");
            li.innerText = curIndex + i + " : " + ~~(Math.random() * total);
            ul.appendChild(li);
          }
          loop(curTotal - pageCount, curIndex + pageCount);
        });
      }
      loop(total, index);
    },
    byFragment() {
      //需要插入的容器
      let ul = document.getElementById("container");
      // 插入十万条数据
      let total = 10000;
      // 一次插入 20 条
      let once = 20;
      //总页数
      let page = total / once;
      //每条记录的索引
      let index = 0;
      //循环加载数据
      function loop(curTotal, curIndex) {
        if (curTotal <= 0) {
          return false;
        }
        //每页多少条
        let pageCount = Math.min(curTotal, once);
        window.requestAnimationFrame(function () {
          let fragment = document.createDocumentFragment();
          for (let i = 0; i < pageCount; i++) {
            let li = document.createElement("li");
            li.innerText = curIndex + i + " : " + ~~(Math.random() * total);
            fragment.appendChild(li);
          }
          ul.appendChild(fragment);
          loop(curTotal - pageCount, curIndex + pageCount);
        });
      }
      loop(total, index);
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>