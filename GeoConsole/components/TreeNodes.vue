<template>
    <div id="mytree">

    </div>
</template>

<script>
  //import VueTree from 'vue-simple-tree/src/components/VueTree'
  // <vue-tree v-model="checkedIds" :tree-data="treeData" :options="options"></vue-tree>
  //import Tree from 'static/tree'
    export default {
      name: "TreeNodes",
      /*
      components: {
        'vue-tree': VueTree,
      },
      */
      data() {
          return {
            // 复选ids,可传入id数组作为初始选中状态
            checkedIds: [],
            // tree数据
            treeData: Tree.data,
            // 设置项
            options: {},
          }
        },
      methods: {
        // 点击节点
        nodeClick:function (m) {
          console.log(JSON.parse(JSON.stringify(m)));
        },
        // 右击事件
        contextmenuClick:function(m){
          console.log(m)
          console.log("触发了自定义的contextmenuClick事件");
        },

      }
    }
</script>

<style scoped>

</style>
