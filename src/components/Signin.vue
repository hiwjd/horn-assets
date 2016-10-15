<template>
  <div>
    <el-row>
      <el-col :span="4" :offset="10">

        <el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
          <el-form-item>
            <h2 style="margin-bottom:0px;">登录</h2>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="ruleForm.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input type="password" v-model="ruleForm.pass" placeholder="密码"></el-input>
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
            <el-button type="primary" @click.native.prevent="handleSubmit" style="width:100%;">登录</el-button>
          </el-form-item>
          <el-form-item>
            <router-link to="/find_pass" class="el-button-text">找回密码</router-link>
            <router-link to="/signup" class="el-button-text" style="float:right;">注册</router-link>
          </el-form-item>
        </el-form>

      </el-col>

    </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'query-string'
  export default {
    data() {
      return {
        ruleForm: {
          email: '',
          pass: '',
          captcha: ''
        },
        rules: {
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur', type: 'email' }
          ],
          pass: [
            { required: true, message: '请输入密码', trigger: 'blur' }
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
        return window.HORN_API + "/captcha/signin?t=" + this.captchaRandom;
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
            axios.post(_self.url("/signin"), qs.stringify(_self.ruleForm)).then(function(res) {
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
  .view {
    padding-top: 140px;
  }
</style>