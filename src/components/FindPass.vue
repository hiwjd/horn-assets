<template>
  <div>
    <AppHead></AppHead>
    <el-row class="view-center">
      <el-col :span="4" :offset="10">

        <el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
          <el-form-item>
            <h2 style="margin-bottom:0px;">找回密码</h2>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="ruleForm.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item>
            <el-col :span="14">
              <el-form-item prop="captcha">
                <el-input v-model="ruleForm.captcha" placeholder="验证码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="1">
              <img :src="captchaUrl" class="el-input__inner" style="cursor:pointer; padding:0; border:none;" @click="refreshCaptcha" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native.prevent="handleSubmit" style="width:100%;">发送邮件</el-button>
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
      return {
        ruleForm: {
          email: '',
          captcha: ''
        },
        rules: {
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur', type: 'email' }
          ],
          captcha: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        },
        captchaRandom: (new Date()).getTime()
      };
    },
    computed: {
      captchaUrl: function() {
        return window.HORN_API + "/captcha/find_pass?t=" + this.captchaRandom;
      }
    },
    methods: {
      url(path) {
        return window.HORN_API + path;
      },
      refreshCaptcha() {
        this.captchaRandom = (new Date()).getTime();
      },
      handleSubmit(ev) {
        var _self = this;
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            _self.$http.post(_self.url("/find_pass"), qs.stringify(_self.ruleForm)).then(function(res) {
              _self.refreshCaptcha();
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
              _self.refreshCaptcha();
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
    },
    created () {
      console.log("Signin.vue created");
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