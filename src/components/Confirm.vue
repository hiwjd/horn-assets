<template>
<div>
  <AppHead></AppHead>
    <el-row class="view-center">
        <el-col :span="4" :offset="10">
            <h1>感谢您的注册，请查看激活邮件</h1>
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