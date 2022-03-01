<script>
import { reactive, ref, onMounted, unref, toRaw } from "vue";
import GZTable from "../components/Table.vue";
import GZTableTransfer from "@/components/TableTransfer.vue";
export default {
  name: "testtable",
  components: {
    GZTable,
    GZTableTransfer,
  },
  setup() {
    let dialogVisible = ref(false);
    let showTable = ref(true);

    const getDataList = () => {
      let tableData = reactive({
        arr: [
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
        ],
      });
      let arr = [
        {
          prop: "date",
          label: "日期",
          width: "180",
          indexId: "0",
          isshow: true,
        },
        {
          prop: "name",
          label: "姓名111",
          width: "180",
          indexId: "1",
          isshow: true,
        },
        {
          prop: "address",
          label: "地址",
          width: "380",
          indexId: "2",
          isshow: true,
        },
      ];
      let columns = ref(arr);
      let columnsSource = ref([
        {
          prop: "date",
          label: "日期",
          width: "180",
          indexId: "0",
          isshow: true,
        },
        {
          prop: "name",
          label: "姓名111",
          width: "180",
          indexId: "1",
          isshow: true,
        },
        {
          prop: "address",
          label: "地址",
          width: "380",
          indexId: "2",
          isshow: true,
        },
      ]);

      return {
        tableData,
        columns,
        columnsSource,
      };
    };

    const handleClose = (str) => {
      dialogVisible.value = str;
    };

    const setCheckedColumns = (value) => {
      showTable.value = false;
      console.log(value);
      let newColumns = unref(value.value);
      let curcolumns = JSON.parse(JSON.stringify(columnsSource.value));
      for (let i = 0, len = curcolumns.length; i < len; i++) {
        let temp = curcolumns[i];
        if (typeof temp == "object") {
          let prop = temp.prop;
          let index = newColumns.findIndex((value, index, arr) => {
            return value == prop;
          });
          if (index > -1) {
            curcolumns[i]["indexId"] = index;
            curcolumns[i]["isshow"] = true;
          } else {
            curcolumns.splice(i, 1);
          }
        }
      }

      console.log(curcolumns);
      curcolumns = curcolumns.map(function (item) {
        if (item.indexId != -1) {
          return item;
        }
      });
      console.log(curcolumns);

      curcolumns.sort((a, b) => {
        return a.indexId - b.indexId;
      });

      columns.value = curcolumns;

      dialogVisible.value = false;
      showTable.value = true;
    };

    const { tableData, columns, columnsSource } = getDataList();

    return {
      tableData,
      columns,
      columnsSource,
      dialogVisible,
      showTable,
      getDataList,
      handleClose,
      setCheckedColumns,
    };
  },
};
</script>
<template>
  testtable1122
  <el-button type="text" @click="dialogVisible = true">设置列</el-button>
  <GZTable
    v-if="showTable"
    :isSelection="false"
    :tableData="tableData.arr"
    :columns="columns"
  ></GZTable>

  <GZTableTransfer
    :dialogVisible="dialogVisible"
    :columnData="columnsSource"
    @handleClose="handleClose($event)"
    @setCheckedColumns="setCheckedColumns($event)"
  ></GZTableTransfer>
</template>