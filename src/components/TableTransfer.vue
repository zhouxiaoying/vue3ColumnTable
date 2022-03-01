<script>
import { ref, toRefs } from 'vue'
import { ElMessageBox, ElMessage } from "element-plus";
import { ArrowUp, ArrowDown, Top } from '@element-plus/icons'//图标
export default({
    name:"GZTableTransfer",
    props:{
        dialogVisible:{
            type: Boolean,
            require: true
        },
        columnData:{
            type: Array,
            require: true
        },
        value:{
            type: Array,
            require: true
        }

    },
    emits: ["handleClose","setCheckedColumns"],//父组件传递过来的方法
    
    components:{
        ArrowUp,
        ArrowDown,
        Top
    },
    setup(props, { emit }) {
    let tempSelectionKeys = ref([]);
    
    let arr = [];
    props.columnData.map((item)=>{
        arr.push(item.prop);
    })
    let value = ref(arr);
     const handleClose = () => {
         emit('handleClose',false)
    }
    let upDownDisable = ref(true)
    const updata = ()=>{
        //判断选择的是不是一个 只支持单个元素改变排序
        if(tempSelectionKeys.length>1){
            ElMessage.error({
                message: "只支持单选调顺序",
            });
        }
        let indexNum = 0;
        for(let i = 0;i<tempSelectionKeys.length;i++){
            indexNum = (value.value).indexOf(tempSelectionKeys[i]);
            console.log(indexNum);
            if(indexNum>0){
                (value.value).splice(indexNum-1,0,tempSelectionKeys[i]);
                (value.value).splice(indexNum+1,1);
            }
        }
        
    }
    const downdata = ()=>{
        //判断选择的是不是一个 只支持单个元素改变排序
        if(tempSelectionKeys.length>1){
            ElMessage.error({
                message: "只支持单选调顺序",
            });
        }
        let indexNum = 0;
        for(let i = 0;i<tempSelectionKeys.length;i++){
            indexNum = (value.value).indexOf(tempSelectionKeys[i]);
            console.log(indexNum);
            if(indexNum>-1 && indexNum != (value.value).length-1){
                (value.value).splice(indexNum+2,0,tempSelectionKeys[i]);
                (value.value).splice(indexNum,1);
            }
        }
    }
    const topdata = ()=>{
        //判断选择的是不是一个 只支持单个元素改变排序
        if(tempSelectionKeys.length>1){
            ElMessage.error({
                message: "只支持单选调顺序",
            });
        }
        let indexNum = 0;
        indexNum = (value.value).indexOf(tempSelectionKeys[0]);
        (value.value).splice(indexNum,1);
        (value.value).unshift(tempSelectionKeys[0]);

    }
    const rightCheck = (selectionsKeys,changeKeys)=>{
        tempSelectionKeys = selectionsKeys;
        if(selectionsKeys.length > 0){
            upDownDisable.value = false;
        }else{
            upDownDisable.value = true;
        }
    }
    const setCheckedColumns = ()=>{
        //将选择到右侧的columns值 传给父组件 刷新表格
        emit('setCheckedColumns',value)
    }
    // setCheckedColumns()


    return {
      tempSelectionKeys,
      value: value,
      handleClose,
      setCheckedColumns,
      upDownDisable,
      updata,
      downdata,
      topdata,
      rightCheck,
    }

    },
})
</script>
<template>
<!-- <el-button type="text" @click="dialogVisible = true">设置列</el-button> -->
 <el-dialog
    v-model="dialogVisible"
    title="设置列"
    width="760px"
    :before-close="handleClose"
  >
  <el-row>
      <el-col :span="20">
          <!--target order 属性是必须的 否则排序会不好使-->
          <el-transfer
            v-model="value"
            :props="{
            key: 'prop',
            label: 'label',
            }"
            target-order="push"
            :data="columnData"
            @right-check-change="rightCheck"
        >
        </el-transfer>
      </el-col>
      <el-col :span="4" style="display:flex;flex-direction:column;justify-content: space-around;">
          <div>
              <el-button  :disabled="upDownDisable" @click="updata" circle>
                  <el-icon style="vertical-align: middle;">
                    <ArrowUp />
                    </el-icon>
              </el-button>
          </div>
          <div>
              <el-button  :disabled="upDownDisable" @click="downdata" circle>
                   <el-icon style="vertical-align: middle;">
                    <ArrowDown />
                    </el-icon>
              </el-button>
          </div>
          <div>
              <el-button  :disabled="upDownDisable" @click="topdata" circle>
                   <el-icon style="vertical-align: middle;">
                    <Top />
                    </el-icon>
              </el-button>
          </div>
      </el-col>
  </el-row>
 
   <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="setCheckedColumns">确定</el-button>
      </span>
    </template>
    </el-dialog>
</template>
<style>

</style>