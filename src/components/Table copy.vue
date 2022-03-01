<script>
import { ref, toRefs, watchEffect,onMounted } from 'vue'

export default({
    name:"GZTable",
    props:{
        tableData:Array,
        columns:Array,
        isSelection:Boolean,
        isvisible:Boolean,

    },
    emits: ["sizeChange","currentChange"],//父组件传递过来的方法
    setup(props,context) {
        // let { columns, tableData, isSelection, isvisible} = props;
        // const columns = props.columns;
        // const tableData = props.tableData;
        const handleSizeChange = (val)=>{
            console.log(`每页 ${val} 条`)
            //触发父组件的方法
            context.emit('sizeChange',val)
        }
        const handleCurrentChange = (val)=>{
            console.log(`当前页: ${val}`)
            context.emit('currentChange',val)
        }
        const currentPage = ref(4);

         watchEffect(() => {
            // columns = ;
            // console.log(columns);
            console.log(666888);
        });

        onMounted(()=>{
            console.log(181818);
        })







        return{
            // columns,
            // tableData,
            handleSizeChange,
            handleCurrentChange,
            currentPage,
            // isSelection, 
            // isvisible
        }
    },
})
</script>
<template>
     <el-table  :data="tableData"  style="width: 100%">
         <template v-for="item in columns">
             <el-table-column v-if="isSelection" type="selection" width="55" />
             <el-table-column
                v-if="item.isshow !== false"
                :key="item.indexId"
                :align="item.align"
                :prop="item.prop"
                :label="item.label"
                :formatter="item.formatter"
                :column-key="item.prop"
                :filters="item.filters"
                :filter-method="item.filtersMethod"
                :sortable="item.sortable"
                :header-align="item.headerAlign"
                :filter-multiple="item.filterMultiple"
             ></el-table-column>
         </template>
    </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    >
    </el-pagination>
</template>


<style scoped>

</style>
