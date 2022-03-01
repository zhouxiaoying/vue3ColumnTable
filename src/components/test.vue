<script>
import { ref, getCurrentInstance, onMounted, watchEffect, toRefs } from 'vue'
import { ElMessageBox, ElMessage } from "element-plus";
import { ArrowUp, ArrowDown, Top } from '@element-plus/icons'//图标
export default({
    name:"Test",
    props:{
        data:{
            type: Array,
            require: true
        }

    },
    
    components:{
        ArrowUp,
        ArrowDown,
        Top
    },
    setup(props, { emit }) {
    let value = ref([]);
    const { data } = toRefs(props);
    const tableData = []
   
   


    return {
      data,
      tableData
    }

    },
})
</script>
<template>
<!-- <el-button type="text" @click="dialogVisible = true">设置列</el-button> -->
  <ul>
        <li v-for="item in data" :key="item.id">
          {{item.name}}-{{item.value}}
        </li>
      </ul>
       <el-table :data="tableData" style="width: 100%">
           <template v-for="item in data">
             <el-table-column
                 v-if="item.id != 1"
                :key="item.id"
                :prop="item.name"
                :label="item.value"
             ></el-table-column>
           </template>
    </el-table>
</template>
<style>

</style>