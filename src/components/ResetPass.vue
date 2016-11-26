<template>
  <div>
    <AppHead></AppHead>
    <el-row class="view-center">
      <el-col :span="4" :offset="10">

        <el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
          <el-form-item>
            <h2 style="margin-bottom:0px;">重置密码</h2>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input type="password" v-model="ruleForm.pass" placeholder="新密码"></el-input>
          </el-form-item>
          <el-form-item prop="repass">
            <el-input type="password" v-model="ruleForm.repass" placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native.prevent="handleSubmit" style="width:100%;">保存新密码</el-button>
          </el-form-item>
          <!--<el-form-item>
            <router-link to="/signin" class="el-button-text">登录</router-link>
            <router-link to="/signup" class="el-button-text" style="float:right;">注册</router-link>
          </el-form-item>-->
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
    data() {
      var _this = this;
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (_this.ruleForm.repass !== '') {
            _this.$refs.ruleForm.validateField('repass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请确认新密码'));
        } else if (value !== _this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          repass: '',
          token: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          repass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
        captchaRandom: (new Date()).getTime()
      };
    },
    created () {
      var q = qs.parse(window.location.search);
      debugger;
      this.ruleForm.token = q.token;
    },
    methods: {
      url(path) {
        return window.HORN_API + path;
      },
      handleSubmit(ev) {
        var _self = this;
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            _self.$http.post(_self.url("/reset_pass"), qs.stringify(_self.ruleForm)).then(function(res) {
              _self.$message({
                message: res.data.msg,
                type: "info",
                onClose: function() {
                  if(res.data.code == '1000') {
                    var route = _self.$route;
                    if(route.query.redirect) {
                      _self.$router.replace(route.query.redirect);
                    } else {
                      _self.$router.replace("/portal");
                    }
                  }
                }
              });
            }).catch(function(error) {
              _self.$message({
                message: "发生了错误",
                type: "error"
              });
            });
          } else {
            return false;
          }
        });
      }
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