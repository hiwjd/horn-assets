<template>
  <div>

    <div class="userlist" v-bind:style="{ height:computedHeight, background: '#fff', overflow: 'auto' }">
      <div class="chat-item" v-for="chat in chats" :class="{active: isActive(chat)}" @click="choseu(chat, $event)">
          <el-row>
            <el-col :span="4">
              <img src="http://placehold.it/40x40">
            </el-col>
            <el-col :span="20">
              <div>
                {{chat.id}}
              </div>
              <div>
                <el-tag type="gray">标签二</el-tag>
                <el-tag type="primary">标签三</el-tag>
              </div>
            </el-col>
          </el-row>
        </div>
    </div>

    <el-row style="margin-left: 260px;">
      <el-col :span="24" style="border-right:1px solid #efefef; height:100%;">
        <router-view :height="height"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    created () {
      console.log("Chat.vue created");

      window.addEventListener('resize', this.handleResize)

      //debugger;
      // console.log(this.$route.params);
      // if(!this.$route.params.uid) {
      //   if(Object.keys(this.users).length > 0) {
      //     console.log("默认选第一个");
      //     var _uid = Object.keys(this.users)[0];
      //     this.$router.push({ name: "chatcard", params: {uid: _uid} });
      //   } else {
      //     console.log("跳转到nochat");
      //     this.$router.push({ name: "nochat" });
      //   }
      // } else {
      //   console.log("找对话");
      //   if(typeof this.users[this.$route.params.uid] == "object") {
      //     this.curUser = this.users[this.$route.params.uid];
      //   } else {
      //     this.$router.push({ name: "nochat" });
      //   }
      // }
    },
    data () {
        return {
            height: window.innerHeight
        }
    },
    methods: {
      choseu (chat, e) {
        console.log("choseu");
        this.$store.dispatch('choseChat', {chat: chat});
        this.$router.push({ name:"chatcard", params: {uid: chat.id, chat:chat}, meta: {chat: chat} });
      },
      handleResize: function(e) {
        this.height = window.innerHeight;
        this.width = window.innerWidth;
      },
      isActive: function(chat) {
        if(this.$store.state.chat) {
          return this.$store.state.chat.id == chat.id;
        }
        return false;
      }
    },
    computed: {
        computedHeight: function() {
            return this.height + "px";
        },
        chats: function() {
          return this.$store.state.chats;
        },
        chat: function() {
          return this.$store.state.chat;
        }
    }
  }
</script>

<style scoped>
.userlist {
  width: 260px;
  height: 100%;
  float: left;
  box-sizing: border-box;
  background-color: #f5f7fa;
  box-shadow: inset -1px 0 0 #e1e4eb;
  position: fixed;
}
.chat-item {
  padding: 10px; 
  cursor:pointer;
  font-size: 12px;
  cursor: pointer;
}
.active {
  background-color: #f5f7fa;
  border-right: 2px solid red;
}
.chat-item .el-tag {
  font-size: 12px;
}
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
.right-body {
  width: calc(100% - 70px);
  height: auto;
  position: absolute;
  right: 0;
}
.chat-card {
  border: 1px solid #efefef;
  margin: 20px;
  background: #fff;
}
.chat-tool {
  height: 40px;
  border-bottom: 1px solid #efefef;
  line-height: 40px;
  padding: 0 5px;
}
.chat-tip {
  height: 34px;
  border-bottom: 1px solid #efefef;
  line-height: 34px;
  padding: 0 5px;
}
.chat-pan {
  border-bottom: 1px solid #efefef;
  min-height: 200px;
}
.chat-editor {
  min-height: 100px;
}
.chat-editor-tool {
  height: 30px;
  border-bottom: 1px solid #efefef;
}
.chat-info {
  padding: 30px 20px 20px 0;
  font-size: 14px;
}
</style>