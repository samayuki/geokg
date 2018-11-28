<template>
	<div v-if="!$store.state.authUser" class="container">
    <h1 class="title">还未登录！请重新登录后访问</h1>
    <el-button class="button--orange"><a class="subtitle" href="/">Login</a></el-button>
	</div>
  <div v-else class="container">
    <h1 class="title--3x">数据库</h1>
    <el-cascader
      v-on:change="getTabelData()"
      v-model="dataCascader"
      expand-trigger="hover"
      placeholder="试试搜索：近代建筑"
      :options="options">
    </el-cascader>
    <el-table :data="sourceData"
              style="width: 90%"
              max-height="550"
              class="data-table"
              v-loading="loading"
              stripe>
      <el-table-column
        type="selection"
        width="55"
        fixed>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        :prop="item.prop"
        :label="item.label"
        v-for="item in tableColumns"
        :key="item.id"
        width="140"
       >
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="80">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import axios from "~/plugins/axios";
  export default {
    head: {
      title: "DATA | 数据库管理"
    },
    methods:{
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push({path: "/edit", query: {name: this.sourceData[index]["name"]}});
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      async getTabelData() {
        var value = this.dataCascader[2];
        if(value === "lunwen1") {
          this.tableColumns = [
            {prop: "name", label: "名字"},
            {prop: "built_year", label: "建筑年代"},
            {prop: "types", label: "建筑类型"},
            {prop: "materials", label: "建筑材料"},
            {prop: "address", label: "地址"},
            {prop: "district", label: "所在地区"},
            {prop: "region", label: "所在区域"},
            {prop: "description", label: "描述"},
          ]
        } else if (value === "jianzhu"){
          this.tableColumns = [
            {prop: "c_title", label: "标题(中文)"},
            {prop: "e_title", label: "标题(英文)"},
            {prop: "c_author", label: "作者(中文)"},
            {prop: "e_author", label: "作者(英文)"},
            {prop: "c_key_word", label: "关键词(中文)"},
            {prop: "e_key_word", label: "关键词(英文)"},
            {prop: "online_date", label: "在线出版日期"},
            {prop: "c_abstract", label: "摘要(英文)"},
            {prop: "e_abstract", label: "摘要(中文)"}
          ]
        }
        try {
          this.loading = true;
          await axios.get("/api/getTableData", {params: {source: value}}).then(({data})=>{
            console.log(data);
            this.sourceData = data.sourceData;
            this.loading = false;
          });
        } catch (e) {
          console.log(e);
        }
      }
    },
    data() {
      return {
        dataCascader:[],
        tableColumns:[],
        sourceData:[],
        loading: false,
        options: [
          {
            value: 'datasource',
            label: '数据来源',
            children:[
            {
              value: 'lunwen',
              label: '论文',
              children: [
                {
                  value: 'lunwen1',
                  label:"近代转型期岭南传统建筑中的新型建筑材料运用研究-曾娟"
                }
              ]
            }]
          }
        ]
      }
    }
  }
</script>
<style>
  .data-table {
    margin: 10px auto 10px auto;
  }
</style>
