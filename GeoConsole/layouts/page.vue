<template>
    <el-main class="container">
      <nuxt/>
    </el-main>
</template>

<style>
  html,body {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .container {
    min-height: -moz-calc(100vh - 280px);
    min-height: -webkit-calc(100vh - 280px);
    min-height: calc(100vh - 280px);
    text-align: center;
  }

  .footer {
    background-color:#3B8070;
    color:#fff;
    height: 20px;
    font-size: 15px;
    line-height: 20px;
    text-align: center;
  }

  .el-menu-demo,
  .el-menu-item {
    height:   55px;
    line-height: 55px;
    font-size: 25px;
    border:0;
  }


</style>
