<template>
<div>
  <AppHead></AppHead>
    <el-row class="view-center">
        <el-col :span="4" :offset="10">
            <h1>您已完成注册！点击<router-link to="/signin" class="el-button-text">登录</router-link></h1>
        </el-col>
    </el-row>
</div>
</template>

<script>
  import AppHead from './AppHead.vue'
  export default {
    components: {
      'AppHead': AppHead
    }
  }
</script>

<style scoped>
  .el-form-item.is-required .el-form-item__label:before {
    content: '';
    display: table;
  }
  .view-center {
    padding-top: 90px;
  }
</style>