<template>
  <div id="app">
    <router-view class="view"></router-view>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    handleselect (index, indexArr) {
      var _self = this;
      if(index == "/signout") {
        axios.get(window.HORN_HOST+"/signout").then(function(rsp) {
          _self.$router.push("/");
        }).catch(function(err) {
          _self.$message({
            message: "登出失败",
            type: "error"
          });
        });
      } else {
        this.$router.push(index);
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
