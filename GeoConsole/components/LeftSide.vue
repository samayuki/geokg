<template>
  <el-aside id = "left-sidebar" class="sidebar-collapse">
    <el-col >
      <el-row id="user-info" class="sidebar-collapse">
        <img :src="user.avatar" class="aside-avatar">
        <p class="user-name">{{user.name}}</p>
      </el-row>
      <el-row class="my-menu-item">
        <a href="/"><span><i class="fa fa-home fa-lg"></i></span>首页</a>
      </el-row>
      <el-row class="my-menu-item">
        <a href="/users"><span><i class="fa fa-user-o fa-lg"></i></span>用户信息管理</a>
      </el-row>
      <el-row class="my-menu-item">
        <a href="/geo"><span><i class="fa fa-server fa-lg"></i></span>建筑信息管理</a>
      </el-row>
      <el-row class="my-menu-item">
        <a href="/geomap"><span><i class="fa fa-map-o fa-lg"></i></span>建筑地址标注</a>
      </el-row>
      <el-row class="my-menu-item">
        <a href="/tree"><span><i class="fa fa-sort-amount-asc fa-lg"></i></span>分类树管理</a>
      </el-row>
      <el-row class="my-menu-item">
        <a href="/crawler"><span><i class="fa fa-search-plus fa-lg"></i></span>网络信息抓取</a>
      </el-row>
      <el-row class="my-menu-item">
        <a href="/new"><span><i class="fa fa-edit fa-lg"></i></span>新建数据项</a>
      </el-row>
      <el-row class="my-menu-item">
        <a href="/uncheck"><span><i class="fa fa-info-circle fa-lg"></i></span>未分类信息库</a>
      </el-row>
    </el-col>
  </el-aside>
</template>

<script>
  export default {
    name: "left-sidebar",
    props: ["user"]
  }
</script>

<style>
  .user-name {
    margin: 10px 0 0 0;
  }
  .aside-avatar {
    width: 70%;
    border-radius: 50%;
  }
  .my-menu-item {
    height: 40px;
    overflow: hidden;
    color: white;
    text-align: left;
  }
  .my-menu-item:hover {
    background-color: #FEB300;
  }
  .my-menu-item i{
    width: 30px;
    height: 30px;
    line-height: 30px;
  }
  .my-menu-item span{
    height: 40px;
    width: 55px;
    padding: 5px 10px 5px 15px;
    display: inline-block;
    box-sizing: padding-box;
  }
  .my-menu-item > a {
    font-size: 16px;
    color: white;
    text-decoration: none;
  }

</style>
