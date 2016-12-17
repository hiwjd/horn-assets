<template>
  <el-row>
      <el-col :span="17">
        
        <div class="chat-card">
          <div class="chat-tool">{{track.addr}}</div>
          <div class="chat-tip">{{track.os}} {{track.browser}} 正在浏览 <a target="_blank" :href="track.url">{{track.title}}</a> IP:{{track.ip}}</div>
          <div class="chat-pan" v-bind:style="{ height: panHeight, overflow: 'auto' }">
            <div v-for="m in chat.msgs" class="message" :class="[m.type, {me:m.from.uid==me.sid}]">
              <div class="m-from">
                <span class="m-name">{{m.from.name||'&nbsp;'}}</span>
                <span class="m-time">{{m.created_at|msgtime}}</span>
              </div>
              <div class="m-text">{{m.text}}</div>
            </div>
            <!-- <ul>
              <li v-for="m in chat.msgs">
                <pre v-if="m.type=='text'">{{m.text}}</pre>
                <pre v-if="m.type=='image'">图片{{m.image.src}}</pre>
                <pre v-if="m.type=='file'">文件{{m.file.src}}</pre>
                <pre v-if="m.type=='request_chat'">收到请求对话</pre>
                <pre v-if="m.type=='join_chat'">收到加入对话</pre>
              </li>
            </ul> -->
          </div>
          <div class="chat-editor">
            <div class="chat-editor-tool">
              <span>ctrl发送<input type="checkbox" v-model="ctrl"></span>
            </div>
            <div class="chat-editor-input">
              <textarea class="inputor" v-model="content" v-on:keydown.enter="enter" v-bind:style="{ height: '149px' }"></textarea>
            </div>
          </div>
        </div>

      </el-col>
      <el-col :span="7">
        <div class="chat-info">

          <div class="infocard">
            <div class="infocard-head">访问轨迹</div>
            <div class="infocard-body">
              <div v-for="t in chat.tracks"><a target="_blank" :href="t.url">{{t.created_at|moment_fromnow}} {{t.title}}</a></div>
            </div>
          </div>

          <div class="infocard">
            <div class="infocard-head">访客信息</div>
            <div class="infocard-body">
              <div>指纹 {{track.fp}}</div>
              <div>VID {{chat.vid}}</div>
              <div>IP {{track.ip}}</div>
            </div>
          </div>

          <div class="infocard">
            <div class="infocard-head">自定义信息</div>
            <div class="infocard-body">
              <div>xxxxx</div>
              <div>xxxxx</div>
              <div>xxxxx</div>
            </div>
          </div>

          <div class="infocard">
            <div class="infocard-head">标签</div>
            <div class="infocard-body">
              <el-tag type="primary">标签三</el-tag>
              <el-tag type="success">标签四</el-tag>
              <el-tag type="warning">标签五</el-tag>
            </div>
          </div>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    props: ["height"],
    data () {
      return {
        text: "Hello World!",
        content: "",
        ctrl: false
      }
    },
    computed: {
      panHeight: function() {
        var _h = this.height - 297;
        return _h + "px";
      },
      chat: function() {
        return this.$store.state.chat;
      },
      track: function() {
        return this.$store.state.chat.tracks[0];
      },
      visitor: function() {
        return this.$store.state.chat.visitor;
        // // 存在访客信息则使用，没有的话使用对话里采集到的访客信息
        // return typeof this.$store.state.visitors[this.chat.vid] != "undefined" 
        //   ? this.$store.state.visitors[this.chat.vid] 
        //   : this.$store.state.chat.track;
      },
      me: function() {
        return this.$store.state.me;
      }
    },
    created () {
      console.log("ChatCard.vue created");
    },
    watch: {
      'chat.msgs': function() {
        this.$nextTick(function() {
          var chatpan = this.$el.querySelector(".chat-pan");
          if(chatpan) {
            chatpan.scrollTop = chatpan.scrollHeight;
          }
        });
      }
    },
    methods: {
      enter: function(event) {
        if(this.ctrl == event.ctrlKey) {
          //debugger;
          event.preventDefault();
          event.stopPropagation();
          this.send();
        }
      },
      send: function() {
        var content = this.content;
        this.content = "";
        HORN.SendMsgText(this.chat.cid, content, function(j) {
            console.log(j);
        }, function(j) {
            console.log(j);
        });
      }
    }
  }
</script>

<style scoped>
textarea.inputor {
  width: 100%;
  resize: none;
  border: none;
  outline: none;
  font-size: 14px;
}
.chat-card {
  /*border: 1px solid #efefef;*/
  /*margin: 20px;*/
  background: #fff;
  /*box-shadow: 0 1px 3px 0 rgba(52,63,75,.1);*/
  /*box-shadow: 0 0 2px rgba(0,0,0,0.2);*/
  box-shadow: inset -1px 0 0 #e1e4eb;
}
.chat-tool {
  height: 40px;
  border-bottom: 1px solid #efefef;
  line-height: 40px;
  padding: 0 10px;
  font-size: 15px;
}
.chat-tip {
  height: 34px;
  border-bottom: 1px solid #efefef;
  line-height: 34px;
  padding: 0 10px;
  font-size: 12px;
}
.chat-pan {
  border-bottom: 1px solid #efefef;
  min-height: 200px;
  font-size: 13px;
  padding: 10px;
}
.chat-editor {
  min-height: 200px;
}
.chat-editor-tool {
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  font-size: 12px;
}
.chat-editor-input {
  padding: 0 10px 10px 10px;
}
.chat-info {
  padding: 20px;
  font-size: 12px;
}

.message {
    font-size: 12px;
    margin-bottom: 15px;
    display: inline-block;
    width: 100%;
}
.message .m-from {
    color: gray;
    margin-bottom: 5px;
}
.message .m-text {
    border: 1px solid #eee;
    padding: 10px;
    border-radius: 3px;
    display: inline-block;
    max-width: 50%;
    background-color: #efefef;
    word-wrap: break-word;
    word-break: break-word;
}
.message .m-from .m-time {
    margin-left: 10px;
}
.me .m-text {
  float: right;
}
.me .m-from .m-time {
  float: right;
}
.me .m-from .m-name {
  visibility: hidden;
}

.infocard {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #EFF2F7;
  color: #000;
}
.infocard-head {
  font-weight: bold;
  margin-bottom: 10px;
}
.infocard a {
  text-decoration: none;
}
</style>