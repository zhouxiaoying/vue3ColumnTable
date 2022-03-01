<script>
import { ref, reactive, onMounted, markRaw, toRaw, unref } from "vue";
import GZTable from "@/components/Table.vue";
import GZTableTransfer from "@/components/TableTransfer.vue";
import Test from "@/components/test.vue";
export default {
  name: "test1",
  components: {
    GZTable,
    GZTableTransfer,
    Test,
  },
  setup() {
    // const showTable = ref(false);

    const dialogVisible = ref(false);
    const tableData = ref([]);
    const handleSizeChange = (val) => {
      alert(val);
    };
    const handleCurrentChange = (val) => {
      alert(val);
    };
    const initData = () => {
      alert("init");
    };
    const handleClose = (str) => {
      dialogVisible.value = str;
    };
    const setCheckedColumns = (value) => {
      console.log(value);
      // showTable.value = false;

      console.log(columns);

      //改变table的columns列，刷新table
      let newColumns = unref(value.value);
      // let curcolumns = toRaw(columnsSource).arr;
      let curcolumns = JSON.parse(JSON.stringify(columnsSource.arr));
      for (let i = 0, len = curcolumns.length; i < len; i++) {
        let temp = curcolumns[i];
        if (typeof temp == "object") {
          console.log(temp);
          let prop = temp.prop;
          console.log(prop);
          let index = newColumns.findIndex((value, index, arr) => {
            return value == prop;
          });
          if (index > -1) {
            curcolumns[i]={
              ...curcolumns[i],
              indexId:index,
              isshow:true
            }
          } else {
            curcolumns[i]={
              ...curcolumns[i],
              indexId:'-1',
              isshow:false
            }
          }
        }
      }
      curcolumns.map((item)=>{
        if(item.isshow == 'true'){
          return item
        }
      })
      curcolumns.sort((a, b) => {
        return a.indexId - b.indexId;
      });
      console.log(curcolumns);

      columns.arr = curcolumns;

      // showTable.value = true;
      dialogVisible.value = false;
    };

    const getDataList = () => {
      // showTable.value = false;
      tableData.value = [
        {
          date: "22222222-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "333333333332016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
      ];
      let arr = [
        {
          prop: "date",
          label: "日期",
          width: "180",
          indexId: 0,
          isshow: true,
        },
        {
          prop: "name",
          label: "姓名111",
          width: "180",
          indexId: 1,
          isshow: true,
        },
        {
          prop: "address",
          label: "地址",
          width: "380",
          indexId: 2,
          isshow: true,
        },
      ];

      let columns = reactive({arr:arr});
      let columnsSource = reactive({arr:[
        {
          prop: "date",
          label: "日期",
          width: "180",
          indexId: 0,
          isshow: true,
        },
        {
          prop: "name",
          label: "姓名111",
          width: "180",
          indexId: 1,
          isshow: true,
        },
        {
          prop: "address",
          label: "地址",
          width: "380",
          indexId: 2,
          isshow: true,
        },
      ]});
      // showTable.value = true;
      return {
      columnsSource,
      columns,
      }
    };

    let {
      columnsSource,
      columns,
      } = getDataList();

    const data = reactive({
      arr: [
        { id: 1, name: "11", value: "111" },
        { id: 2, name: "22", value: "222" },
        { id: 3, name: "33", value: "333" },
        { id: 4, name: "44", value: "444" },
      ],
    });
    const updateData = () => {
      // data.arr.map((item)=>{
      //   item.value = 'iiiii'
      // })
      data.arr = [
        { id: 1, name: "11", value: "111" },
        { id: 2, name: "22", value: "222" },
      ];
    };

    return {
      handleClose,
      getDataList,
      setCheckedColumns,
      // showTable,
      dialogVisible,
      tableData,
      columnsSource,
      columns,
      handleSizeChange,
      handleCurrentChange,
      initData,
      updateData,
      data,
    };
  },
};
</script>

<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>
      <el-button type="text" @click="dialogVisible = true">设置列</el-button>

      <GZTableTransfer
        :dialogVisible="dialogVisible"
        :columnData="columnsSource.arr"
        @handleClose="handleClose($event)"
        @setCheckedColumns="setCheckedColumns($event)"
      ></GZTableTransfer>

      <GZTable
        :isSelection="false"
        :tableData="tableData"
        :columns="columns.arr"
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
      ></GZTable>
    </el-main>
  </el-container>
</template>

<style scoped>
/* @import url(); 引入css类 */
</style>