<template>
  <div class="map-container">
    <el-form :inline="true" action="" @submit.native.prevent="search()">
      <el-form-item>
        <el-input v-model="search_word" placeholder="检索地点" value=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search()">查询</el-button>
      </el-form-item>
    </el-form>
    <div id="bm-view"></div>
  </div>
</template>
<script>
  import axios from "~/plugins/axios";
  import BaiduMapClass from '../assets/js/BaiduMapClass';
  export default  {
    head: {
      script:[
        {src: "http://api.map.baidu.com/api?v=2.0&ak=agIYcxFrxnd5BKUZMqomPyCVUTWCq2pm"},
      ],
      title: "Map | 地图"
    },
    data() {
      return {
        search_word: "",
        poi: [],
        map: null,
      }
    },
   async beforeMount(){
      try {
         let {data} = await axios.get('/api/getMapPoint');
          this.poi = data.mapData;
          this.mapHander();
      } catch (e) {
        console.log("loading poi points failed!" + e);
      }
    },
    beforeDdestroy() {
      this.map = null;
    },
    methods: {
      mapHander() {
        this.map  = new BaiduMapClass(new BMap.Map("bm-view",{enableMapClick:false}));
        this.map.addMarkers(this.poi);
        this.map.showInfoWindow();
        this.map.enableDragEdit();
      },
      search() {
        this.map.searchLocation(this.search_word);
      }
    }
  }
</script>
<style>
  #bm-view{
    width: 80%;
    height: 480px;
    margin: auto auto;
  }
  .el-input {
    width: 220px;
    height: 25px;
  }
</style>
