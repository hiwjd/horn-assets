<template>
  <div>
    <AppHead></AppHead>
    <el-row class="view-center">
      <el-col :span="4" :offset="10">

        <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item>
            <h2 style="margin-bottom:0px;">注册</h2>
          </el-form-item>
          <el-form-item label="公司/团队" prop="com_name">
            <el-input v-model="ruleForm.com_name" placeholder="公司／团队名称"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" placeholder="登录邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" placeholder="登录密码"></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-col :span="14">
              <el-form-item prop="captcha">
                <el-input v-model="ruleForm.captcha" placeholder="输入右侧验证码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="1">
              <img :src="captchaUrl" class="el-input__inner" style="cursor:pointer; padding:0; border:none;" @click="refreshCaptcha" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native.prevent="handleSubmit" style="width:100%;">注册</el-button>
          </el-form-item>
          <!--<el-form-item>
            <router-link to="/signin" class="el-button-text">登录</router-link>
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
          captcha: '',
          pass: '',
          com_name: ''
        },
        rules: {
          com_name: [
            { required: true, message: '请输入公司／团队名称', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur', type: 'email' }
          ],
          captcha: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        captchaRandom: (new Date()).getTime()
      };
    },
    computed: {
      captchaUrl: function() {
        return window.HORN_API + "/captcha/signup?t=" + this.captchaRandom;
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
            this.$http.post(_self.url("/signup"), qs.stringify(_self.ruleForm)).then(function(res) {
              console.log(res);
              if(res.data.code == 0) {
                _self.$router.push("/confirm");
              } else {
                _self.refreshCaptcha();
                _self.$message({
                  message: res.data.msg,
                  type: "info",
                  onClose: function() {
                    if(res.data.code == '1000') {
                      //_self.$router.push("/confirm");
                    }
                  }
                });
              }
            }).catch(function(error) {
              console.log(error);
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
      console.log("Signup.vue created");
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