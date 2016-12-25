<template>
  <div>

    <div class="chat-list" v-bind:style="{ height:computedHeight, overflow: 'auto' }">
      <div v-if="chats" class="chat-item" v-for="chat in chats" :class="{active: isActive(chat)}" @click="choseu(chat, $event)">
          <el-row>
            <el-col :span="24">
              <div>
                <span>{{chat.tracks[0].addr}}</span>
                <span class="last-msg-time">{{lastMsgTime(chat) | moment_fromnow}}</span>
                <span class="last-msg">{{lastMsg(chat)}}</span>
              </div>
            </el-col>
          </el-row>
      </div>
      <div v-else>
        ffff
      </div>
    </div>

    <el-row style="margin-left: 260px;">
      <el-col :span="24" style="height:100%;background:#F9FAFC;">
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
    },
    data () {
        return {
            height: window.innerHeight
        }
    },
    beforeRouteEnter (to, from, next) {
      console.log("beforeRouteEnter");
      
      setTimeout(function() {
        next(vm => {
          console.log(vm);
          if(to.params.uid) {
            var chat = vm.$store.state.chats[to.params.uid];
            vm.$store.dispatch('choseChat', {chat: chat});
          } else {
            vm.$store.dispatch('choseChat', {chat: {}});
          }
        });
      }, 500);
    },
    methods: {
      choseu (chat, e) {
        console.log("choseu");
        this.$store.dispatch('choseChat', {chat: chat});
        this.$router.push({ name:"chatcard", params: {uid: chat.cid, chat:chat}, meta: {chat: chat} });
      },
      handleResize: function(e) {
        this.height = window.innerHeight;
        this.width = window.innerWidth;
      },
      isActive: function(chat) {
        if(this.$store.state.chat) {
          return this.$store.state.chat.cid == chat.cid;
        }
        return false;
      },
      lastMsg: function(chat) {
        if(!chat.msgs) {
          return "";
        }

        var m = chat.msgs[chat.msgs.length-1];
        switch(m.type) {
          case "text":
          return m.text;
          break;
        }
      },
      lastMsgTime: function(chat) {
        if(!chat.msgs) {
          return "";
        }

        var m = chat.msgs[chat.msgs.length-1];
        switch(m.type) {
          case "text":
          return m.created_at;
          break;
        }
      }
    },
    computed: {
        computedHeight: function() {
            return this.height + "px";
        },
        chats: function() {
          return this.$store.state.chats;
        }
    }
  }
</script>

<style scoped>
.chat-list {
  width: 260px;
  height: 100%;
  float: left;
  box-sizing: border-box;
  background-color: #475669;
  /*box-shadow: inset -1px 0 0 #e1e4eb;*/
  position: fixed;
  color: #ffffff;
}
.chat-item {
  padding: 10px; 
  cursor:pointer;
  font-size: 14px;
  cursor: pointer;
  color: #D3DCE6;
}
.active {
  background-color: #2c8dff;
  color: #fff;
  /*border-right: 2px solid red;*/
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
.last-msg {
  font-size: 12px;
  line-height: 20px;
  float: right;
}
.last-msg-time {
  font-size: 12px;
  color: #99A9BF;
  float: right;
  margin-left: 5px;
}
</style>