<script>
import { inject } from 'vue'
import { ElMessage } from "element-plus";
  export default{
     setup(){
//  ElMessage.success({
//         message: "恭喜你，这是一条成功消息",
//       });
    //    const axios = inject('axios')  // inject axios

    // const getList = () => {
    //   axios
    //     .get('/list')
    //     .then((response) => {
    //       console.log(response.data)
    //     });
    // };
    // getList()

    // return { getList }

    }
    
  }
 
</script>

<template>
  <router-view v-slot="{ Component }">
     <transition>
    <keep-alive>
      <component :is="Component" />
      </keep-alive>
      </transition>
  </router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
