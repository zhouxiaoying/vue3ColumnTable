<script>
import { ref, reactive, onMounted, markRaw, toRaw, unref } from 'vue'
import GZTable from '@/components/Table.vue'
import GZTableTransfer from '@/components/TableTransfer.vue'
export default {
    name:"test12",
    components:{
      GZTable,
      GZTableTransfer
    },
    setup(){
     
      const dialogVisible = ref(false);
      const columns = ref([]);
      const columnsSource = ref([]);
      const tableData = ref([]);
        const handleSizeChange = (val)=>{
          alert(val);
        }
        const handleCurrentChange = (val)=>{
          alert(val);
        }
        const initData = ()=>{
          alert('init');
        }
        const handleClose = (str)=>{
          dialogVisible.value = str;
        }
        const setCheckedColumns = (value)=>{
           //改变table的columns列，刷新table
          let newColumns = unref(value.value);
          let curcolumns = unref(columns.value);
           for(let i = 0,len = curcolumns.length;i<len;i++){
            let temp = curcolumns[i];
            console.log(temp);
            let prop = temp.prop;
            console.log(prop);
            let index = newColumns.findIndex((value,index,arr)=>{
              return value == prop
            })
            if(index>-1){
              curcolumns[i]['indexId'] = index;
              curcolumns[i]['isshow'] = true;
            }else{
              curcolumns[i]['indexId'] = -1;
              curcolumns[i]['isshow'] = false;
            }
           

          }
          curcolumns.sort((a,b)=>{
            return a.indexId - b.indexId
          })
          console.log(curcolumns);

            columns.value = curcolumns;
          showTable.value = false;
           showTable.value = true;
            dialogVisible.value = false; 

        }


        const showTable = ref(false);
        const getDataList = ()=>{
          showTable.value = false;
          tableData.value = [
             {
            date: '11111111112016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
          },
        ];
           let arr = [
         {
                'prop':'date',
                'label':'日期',
                'width':'180',
                'indexId':'1',
                'isshow':true
            },
            {
                'prop':'name',
                'label':'姓名111',
                'width':'180',
                'indexId':'2',
                'isshow':true
            },
            {
                'prop':'address',
                'label':'地址',
                'width':'380',
                'indexId':'3',
                'isshow':true
            }
      ];
      columns.value = arr;
      columnsSource.value = arr;
      showTable.value = true;
        }


        //  onMounted(async ()=>{
           showTable.value = true;
           getDataList();
      // })







        return{
          handleClose,
          getDataList,
          setCheckedColumns,
          showTable,
          dialogVisible,
          tableData,
          columnsSource,
          columns,
          handleSizeChange,
          handleCurrentChange,
          initData
        }

    },

    
}
</script>

<template>
<el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>
      <el-button type="text" @click="dialogVisible = true">设置列</el-button>

       <GZTableTransfer 
       :dialogVisible="dialogVisible"
       :columnData="columnsSource"
       @handleClose="handleClose($event)"
       @setCheckedColumns="setCheckedColumns($event)"
       ></GZTableTransfer>

      <GZTable 
      :isSelection="false"
      :tableData="tableData.value"
      :columns="columns.value"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      ></GZTable>
     
    </el-main>
  </el-container>
</template>

<style scoped>
/* @import url(); 引入css类 */

</style>