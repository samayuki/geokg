<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <div  class="toggle-button">
        <i class="fa fa-bars fa-lg" @click="openSidebar()"></i>
      </div>
    </el-header>
    <el-container>
      <left-sidebar id = "left-sidebar" class="sidebar-collapse" :user="user"></left-sidebar>
      <el-main id="content-container" class="content-collapse">
        <nuxt/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import $ from 'jquery'
  import LeftSide from '../components/LeftSide'
  export default {
    components: {
      "left-sidebar": LeftSide
    },
    data() {
      return {
        user: {
          avatar: require("@/static/avatar.jpg"),
          name: "用户名"
        }
      }
    },
    methods: {
      openSidebar() {
        let $sidebar = $('#left-sidebar');
        let $content = $('#content-container');
        let $userinfo = $('#user-info');
        if($sidebar.hasClass("sidebar-no-collapse")) {
          $sidebar.removeClass("sidebar-no-collapse").addClass("sidebar-collapse");
          $content.removeClass("content-no-collapse").addClass("content-collapse");
          $userinfo.removeClass("sidebar-no-collapse").addClass("sidebar-collapse");
        } else {
          $sidebar.removeClass("sidebar-collapse").addClass("sidebar-no-collapse");
          $content.removeClass("content-collapse").addClass("content-no-collapse");
          $userinfo.removeClass("sidebar-collapse").addClass("sidebar-no-collapse");
        }
      }
    }
  }
</script>

<style>
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }
  html, body {
    margin: 0;
    padding: 0;
    font-size: 14px;
    text-align: center;
  }
  .toggle-button {
    width: 55px;
    height: 55px;
    padding: 10px;
    display: block;
    box-sizing: padding-box;
  }
  .fa-bars {
    width: 35px;
    height: 35px;
    color: white;
    line-height: 35px;
  }
  .my-header {
    position: fixed;
    top: 0;
    background-color: #2C333B;
    height: 55px !important;
    width: 100%;
    overflow-x: auto;
    padding: 0;
    z-index: 99;
  }
  .my-container {
    position: relative;
  }
  #content-container {
    position: absolute;
    top: 55px;
    transition: width .5s ease-in;
    padding: 5px !important;
    -moz-transition: width .5s ease-in;	/* Firefox 4 */
    -webkit-transition: width .5s ease-in;	/* Safari 和 Chrome */
    -o-transition: width .5s ease-in;
  }
  #left-sidebar {
    position: fixed;
    top: 55px;
    left: 0;
    bottom: 0;
    overflow-y: auto;
    background-color: #2C333B;
    color: white;
    margin: 0;
    padding: 0;
    transition: width .5s ease-in;
    -moz-transition: width .5s ease-in;	/* Firefox 4 */
    -webkit-transition: width .5s ease-in;	/* Safari 和 Chrome */
    -o-transition: width .5s ease-in;
    z-index: 99;
  }
  #left-sidebar.sidebar-no-collapse {
    width: 200px !important;
  }
  #left-sidebar.sidebar-collapse {
    width: 55px !important;
  }
  #content-container.content-collapse {
    width: calc(100vw - 55px);
    left: 55px;
  }
  #content-container.content-no-collapse {
    width: calc(100vw - 200px);
    left: 200px;
  }
  #user-info.sidebar-no-collapse {
    margin: 30px auto 20px auto;
    width: 60%;
    text-align: center;
  }
  #user-info.sidebar-collapse {
    display: none;
    transition: margin .5s ease-in-out;
  }
</style>
