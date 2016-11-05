<template>
    <div>
      <div class="left-nav">
        <center style="margin-top: 20px;">
          <span>HORN</span>
        </center>
        
        <ul class="menus">
          <li @click="go('portalhome')" :class="{active: curMenu == 'portalhome'}">
            <el-tooltip class="item" effect="light" content="首页" placement="right">
              <i class="el-icon-menu"></i>
            </el-tooltip>
          </li>
          <li @click="go('chat')" :class="{active: curMenu == 'chat'}">
            <el-tooltip class="item" effect="light" content="对话" placement="right">
              <i class="el-icon-message"></i>
            </el-tooltip>
          </li>
          <li @click="go('visitor')" :class="{active: curMenu == 'visitor'}">
            <el-tooltip class="item" effect="light" content="访客" placement="right">
              <i class="el-icon-star-on"></i>
            </el-tooltip>
          </li>
          <li @click="go('tickets')" :class="{active: curMenu == 'tickets'}">
            <el-tooltip class="item" effect="light" content="工单" placement="right">
              <i class="el-icon-circle-check"></i>
            </el-tooltip>
          </li>
          <li @click="go('history')" :class="{active: curMenu == 'history'}">
            <el-tooltip class="item" effect="light" content="历史" placement="right">
              <i class="el-icon-time"></i>
            </el-tooltip>
          </li>
          <li @click="go('report')" :class="{active: curMenu == 'report'}">
            <el-tooltip class="item" effect="light" content="报表" placement="right">
              <i class="el-icon-picture"></i>
            </el-tooltip>
          </li>
          <li @click="go('customer')" :class="{active: curMenu == 'customer'}">
            <el-tooltip class="item" effect="light" content="顾客" placement="right">
              <i class="el-icon-star-off"></i>
            </el-tooltip>
          </li>
          <li @click="go('setting')" :class="{active: curMenu == 'setting'}">
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
  import Vue from 'vue'
  export default {
    created () {
      console.log("Portal.vue created ##############");

      var _self = this;
      var host = "http://app.horn.com:9092/api";

      var content = $("#content"),
          msg = $("#msg"),
          nick = $("#nick").val(),
          conn_type = $("#conn_type").val();

      HORN.Init({
          uid: "kefu001",
          host: host,
          conn_type: "longpolling",
          role: "kefu"
      });

      var conn = HORN.GetConnection();

      conn.on("connected", function(json) {
          console.log(json);
          if(json.state.chats) {
            var chats = json.state.chats;
            for(var i=0; i<chats.length; i++) {
              chats[i].msgs = [];
              //_self.users[chats[i].id] = chats[i];
              Vue.set(_self.users, chats[i].id, chats[i]);
            }
          }
      });

      conn.on("message", function(json) {
          console.log(json);
          if(json.data) {
              for(var i=0; i<json.data.length; i++) {
                  var m = json.data[i];
                  //content.append("<div>"+m.From.Name+"说: "+m.Text+"</div>");
                  // for(var i=0; i<_self.users.length; i++) {
                  //   _self.users[i].msgs.push(m.text);
                  //   _self.users[i].msg = m.text;
                  // }
                  switch(m.type) {
                      case "text":
                      case "image":
                      case "file":
                        _self.users[m.chat.id].msgs.push(m);
                      break;
                      case "request_chat":
                        HORN.API.JoinChat(m.event.chat.id, function(j) {console.log(arguments);}, function() {console.log(arguments);});
                        Vue.set(_self.users, m.event.chat.id, {id:m.event.chat.id, msgs:[]});
                      break;
                      case "join_chat":
                      break;
                  }
              }
          }
      });

      conn.start();
    },
    data () {
      return {
        curMenu: this.$route.matched[1].name,
        users: {"aaaaa":{"id":"zzzzzz","msgs":[]}}
      }
    },
    methods: {
      go (name) {
        this.curMenu = name;
        this.$router.push({ name: name });
      },
      signout () {
        console.log("signout");
        var _self = this;
        this.$http.get(window.HORN_API+"/signout").then(function(rsp) {
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
  width: 60px;
  height: 100%;
  float: left;
  box-sizing: border-box;
  background-color: #f5f7fa;
  box-shadow: inset -1px 0 0 #e1e4eb;
  position: fixed;
}
.left-nav ul.menus {
  margin: 50px 0 0 0;
  padding: 0;
}
.left-nav ul.menus li {
  text-align: center;
  font-size: 17px;
  padding: 10px 0;
  cursor: pointer;
}
.left-nav ul.menus li.active {
  background-color: #fff;
}
.left-nav ul.menus li:hover {
  background-color: #e1e9f7;
}
.right-body {
  width: calc(100% - 60px);
  height: auto;
  position: absolute;
  right: 0;
  background: #f2f3f5;
}
</style>