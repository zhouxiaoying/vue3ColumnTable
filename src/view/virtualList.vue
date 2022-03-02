<!--  -->
<template>
  <div>
    <!--固定高度  overfolw：auto  监听滚动条-->
    <div ref="list" class="infinite-list-container" @scroll="scrollEvent($event)">
      <!--高度由数据确定 所有数据的高度  产生滚动条  -->
      <div class="infinite-list-phantom" :style="'height:'+listHeight+'px'">
        <!--渲染列表-->
        <div ref="items" class="infinite-list" :style="{ transform: getTransform }">
            <div class="item" 
            v-for="(item,index) in visibleData"
            :key="item.id"
             :style="{ height: itemSize + 'px',lineHeight: itemSize + 'px' }"
            >{{item.value}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VirtualList",
  props:{
      listData:{
          type:Array,
          default:()=>[]
      },
      itemSize:{
          type:Number,
          default:200
      }
  },
  data() {
    return {
        //可视区域高度
      screenHeight:0,
      //偏移量
      startOffset:0,
        start:0,
        end:null
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
       this.screenHeight = this.$el.clientHeight;
    this.start = 0;
    this.end = this.start + this.visibleCount;
  },
  computed:{
      listHeight(){
          return this.listData.length * this.itemSize
      },
      visibleData(){
          return this.listData.slice(this.start,Math.min(this.end,this.listData.length))
      },
       //可显示的列表项数
    visibleCount(){
      return Math.ceil(this.screenHeight / this.itemSize)
    },
    //偏移量对应的style
    getTransform(){
      return `translate3d(0,${this.startOffset}px,0)`;
    },
  },
  methods:{
      scrollEvent(event){
           //当前滚动位置
      let scrollTop = this.$refs.list.scrollTop;
      //此时的开始索引
      this.start = Math.floor(scrollTop / this.itemSize);
      //此时的结束索引
      this.end = this.start + this.visibleCount;
      //此时的偏移量
      this.startOffset = scrollTop - (scrollTop % this.itemSize);
      }
  }
};
</script>
<style type="text/css" lang="less" scoped>
/* @import url(); 引入css类 */
.infinite-list-container {
  overflow: auto;
  position: relative;
  height: 90vh;
  .infinite-list-phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
    .infinite-list {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
    }
  }
}
</style>