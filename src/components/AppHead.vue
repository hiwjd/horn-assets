<template>
    <div class="header">
      <div class="inner">
        HORN
        <div class="right">
          <router-link to="/signup" class="nav">注册</router-link>
          <router-link to="/signin" class="nav">登录</router-link>
        </div>
      </div>
    </div>
</template>

<style scoped>
  body {
    margin: 0;
    padding: 0;
  }
  .header {
    height: 50px;
    border-bottom: 1px solid #efefef;
    line-height: 50px;
  }
  .header .inner {
    width: 900px;
    margin: 0 auto;
    display: block;
  }
  .header .nav {
    color: #000;
    text-decoration: none;
    padding: 10px;
  }
  .header .right {
    float: right;
    clear: both;
  }
</style>