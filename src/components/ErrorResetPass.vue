<template>
  <div>
    <AppHead></AppHead>
    <el-row class="view-center">
      <el-col :span="4" :offset="10">

        <el-form label-position="left" label-width="0" class="demo-ruleForm">
          <el-form-item>
            <h2 style="margin-bottom:0px;">重置密码</h2>
          </el-form-item>
          <el-form-item>
            <h2>{{msg}}</h2>
          </el-form-item>
        </el-form>

      </el-col>

    </el-row>
  </div>
</template>

<script>
  import qs from 'query-string'
  import AppHead from './AppHead.vue'
  export default {
    components: {
      'AppHead': AppHead
    },
    data () {
      return {
        msg: ""
      }
    },
    created () {
      var q = qs.parse(window.location.search);
      this.msg = q.msg;
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