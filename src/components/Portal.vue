<template>
    <div>
      <div class="left-nav">
        <span>HORN</span>
        
        <ul class="menus">
          <li @click="go('portalhome')">
            <el-tooltip class="item" effect="light" content="首页" placement="right">
              <i class="el-icon-menu"></i>
            </el-tooltip>
          </li>
          <li @click="go('chat')">
            <el-tooltip class="item" effect="light" content="对话" placement="right">
              <i class="el-icon-message"></i>
            </el-tooltip>
          </li>
          <li @click="go('visitor')">
            <el-tooltip class="item" effect="light" content="访客" placement="right">
              <i class="el-icon-star-on"></i>
            </el-tooltip>
          </li>
          <li @click="go('tickets')">
            <el-tooltip class="item" effect="light" content="工单" placement="right">
              <i class="el-icon-circle-check"></i>
            </el-tooltip>
          </li>
          <li @click="go('history')">
            <el-tooltip class="item" effect="light" content="历史" placement="right">
              <i class="el-icon-time"></i>
            </el-tooltip>
          </li>
          <li @click="go('report')">
            <el-tooltip class="item" effect="light" content="报表" placement="right">
              <i class="el-icon-picture"></i>
            </el-tooltip>
          </li>
          <li @click="go('customer')">
            <el-tooltip class="item" effect="light" content="顾客" placement="right">
              <i class="el-icon-star-off"></i>
            </el-tooltip>
          </li>
          <li @click="go('setting')">
            <el-tooltip class="item" effect="light" content="设置" placement="right">
              <i class="el-icon-setting"></i>
            </el-tooltip>
          </li>
          <li @click="signout">
            <el-tooltip class="item" effect="light" content="退出" placement="right">
              <i class="el-icon-minus"></i>
            </el-tooltip>
          </li>
        </ul>
      </div>
      <div class="right-body">
        <router-view :users="users"></router-view>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    created () {
      console.log("Portal.vue created ##############");

      var _self = this;

      var host = "http://app.horn.com:9092/api";
      HORN.API.Identity(host, function(uid) {
          
          var content = $("#content"),
              msg = $("#msg"),
              nick = $("#nick").val(),
              conn_type = $("#conn_type").val();

          HORN.Init({
              uid: uid,
              host: host,
              conn_type: "longpolling"
          });

          var conn = HORN.GetConnection();

          conn.on("connected", function(json) {
              console.log(json);
              if(json.chats && json.chats.length == 1) {
                  $("#chat_id").val(json.chats[0].ID);
              }
          });

          conn.on("message", function(json) {
              console.log(json);
              if(json.data) {
                  for(var i=0; i<json.data.length; i++) {
                      var m = json.data[i];
                      //content.append("<div>"+m.From.Name+"说: "+m.Text+"</div>");
                      for(var i=0; i<_self.users.length; i++) {
                        _self.users[i].msgs.push(m.text);
                        _self.users[i].msg = m.text;
                      }
                  }
              }
          });

          conn.start();

      }, function(j) {
          console.error(j);
      });

      var x = 1;
      function receive() {
        for(var i=0; i<this.users.length; i++) {
          this.users[i].msgs.push(x);
          this.users[i].msg = x;
        }
        x++;

        setTimeout(receive.bind(this), 500);
      }

      //receive.call(this);
    },
    data () {
      return {
        users: [
            {"id":"1","addr":"广东深圳","msg":"你好，有人在吗？","msgs":["第一条", "第二条", "第三条", "你好，有人在吗？"]},
            {"id":"2","addr":"四川成都","msg":"支付还是不成功，是不是哪里出问题","msgs":["第一条", "第二条", "第三条", "支付还是不成功，是不是哪里出问题"]},
            {"id":"3","addr":"浙江杭州3","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"4","addr":"浙江杭州4","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"5","addr":"浙江杭州5","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"6","addr":"浙江杭州6","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"7","addr":"浙江杭州7","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"8","addr":"浙江杭州8","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"9","addr":"浙江杭州9","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"10","addr":"浙江杭州10","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"11","addr":"浙江杭州11","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"12","addr":"浙江杭州12","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"13","addr":"浙江杭州13","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"14","addr":"浙江杭州14","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"15","addr":"浙江杭州15","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"16","addr":"浙江杭州16","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"17","addr":"浙江杭州17","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"18","addr":"浙江杭州18","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"19","addr":"浙江杭州19","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"20","addr":"浙江杭州20","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"21","addr":"浙江杭州21","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"22","addr":"浙江杭州22","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"23","addr":"浙江杭州23","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"24","addr":"浙江杭州24","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"25","addr":"浙江杭州25","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"26","addr":"浙江杭州26","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"27","addr":"浙江杭州27","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"28","addr":"浙江杭州28","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"29","addr":"浙江杭州29","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"30","addr":"浙江杭州30","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"31","addr":"浙江杭州31","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"32","addr":"浙江杭州32","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"33","addr":"浙江杭州33","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"34","addr":"浙江杭州34","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"35","addr":"浙江杭州35","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"36","addr":"浙江杭州36","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"37","addr":"浙江杭州37","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"38","addr":"浙江杭州38","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"39","addr":"浙江杭州39","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"40","addr":"浙江杭州40","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"41","addr":"浙江杭州41","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"42","addr":"浙江杭州42","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"43","addr":"浙江杭州43","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"44","addr":"浙江杭州44","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"45","addr":"浙江杭州45","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"46","addr":"浙江杭州46","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"47","addr":"浙江杭州47","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"48","addr":"浙江杭州48","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"49","addr":"浙江杭州49","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]},
            {"id":"50","addr":"浙江杭州50","msg":"请问怎么退货","msgs":["第一条", "第二条", "第三条", "请问怎么退货"]}
        ]
      }
    },
    methods: {
      go (name) {
        this.$router.push({ name: name });
      },
      signout () {
        console.log("signout");
        var _self = this;
        axios.get(window.HORN_API+"/signout").then(function(rsp) {
          console.log(rsp);
          _self.$router.push("/");
        }).catch(function(err) {
          console.log(err);
          _self.$message({
            message: "登出失败",
            type: "error"
          });
        });
      }
    }
  }
</script>

<style scoped>
.left-nav {
  width: 70px;
  height: 100%;
  border-right: 1px solid #efefef;
  float: left;
  box-sizing: border-box;
  background-color: #343f4b;
  color: #fff;
  position: fixed;
}
.left-nav ul.menus {
  margin: 0;
  padding: 0;
}
.left-nav ul.menus li {
  text-align: center;
  font-size: 24px;
  margin: 20px 0;
}
.right-body {
  width: calc(100% - 70px);
  height: auto;
  position: absolute;
  right: 0;
  background: #f2f3f5;
}
</style>