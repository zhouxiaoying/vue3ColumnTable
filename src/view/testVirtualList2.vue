<!--  -->
<template>
  <div>
    <VirtualList :listData="listData" :estimatedItemSize="100"></VirtualList>
  </div>
</template>

<script>
import Faker from "Faker";
console.log(Faker);
import VirtualList from "./virtualList2.vue";
var d = [];
for (let id = 0; id < 1000; id++) {
  d.push({
    id,
    value: Faker.Lorem.sentences(), // 长文本
  });
}
console.log(d);
export default {
  name: "",
  components: {
    VirtualList,
  },
  data() {
    return {
      listData: d,
      itemSize: 50,
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    timeSplit() {
      let ul = document.getElementById("container");
      let total = 10000;
      let once = 20;
      let page = Math.ceil(total / once);
      let index = 0;
      function loop(curTotal, curIndex) {
        if (curTotal <= 0) {
          return false;
        }
        let pageCount = Math.min(curTotal, once);
        window.requestAnimationFrame(function () {
          let fragment = document.createDocumentFragment();
          for (let i = 0; i < pageCount; i++) {
            let li = document.createElement("li");
            li.innerText = curIndex + "--" + i + "--" + total;
            fragment.appendChild(li);
          }
          ul.appendChild(fragment);
        });
        loop(curTotal - pageCount, curIndex + pageCount);
      }
      loop(total, 0);
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>