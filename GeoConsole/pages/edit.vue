<template>
  <el-main class="content">
    <h1 class="title--3x">{{detail.name}}</h1>
    <div class="detail">
      <div class="detail-img">
        <el-carousel :interval="3000" type="card" height="200px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
      <p><strong>所属区域：</strong>{{detail.region}}</p>
      <p><strong>所属行政区：</strong>{{detail.district}}</p>
      <p><strong>建筑类型：</strong>{{detail.types}}</p>
      <p><strong>地址：</strong>{{detail.address}}</p>
      <p><strong>建筑年代：</strong>{{detail.built_year}}</p>
      <p><strong>材料：</strong>{{detail.materials}}</p>
      <p><strong>描述：</strong>{{detail.description}}</p>
  </el-main>
</template>
<script>
  import axios from "../plugins/axios";
  export default {
    head: {
      title: "Edit | 修改信息"
    },
    data() {
      return {
        name: null,
        detail: {}
      }
    },
    asyncData({context, route}) {
      return {
        name: route.query.name
      }
    },
    async created(){
      try {
        let {data} =  await axios.get("/api/getBuildingByName", {params: {name: this.name}});
        this.detail = data.buildingData;
      } catch (e) {
        console.log(e.message);
      }
    },
  }
</script>
<style>
  .content {
    width: 70%;
    margin: auto auto;
    text-align: left;
  }
  .detail {
    margin-top: 10px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
