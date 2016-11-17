<template>
  <el-row>
      <el-col :span="17">
        
        <div class="chat-card">
          <div class="chat-tool">{{chat.id}}</div>
          <div class="chat-tip">正在浏览 <a href="#" @click="send()">功能介绍</a></div>
          <div class="chat-pan" v-bind:style="{ height: panHeight, overflow: 'auto' }">
            <ul>
              <li v-for="m in chat.msgs">
                <pre v-if="m.type=='text'">{{m.text}}</pre>
                <pre v-if="m.type=='image'">图片{{m.image.src}}</pre>
                <pre v-if="m.type=='file'">文件{{m.file.src}}</pre>
              </li>
            </ul>
          </div>
          <div class="chat-editor">
            <div class="chat-editor-tool">
              <span>ctrl发送<input type="checkbox" v-model="ctrl"></span>
            </div>
            <div class="chat-editor-input">
              <div-editor v-model="content" v-on:enter="send" :ctrl="ctrl"></div-editor>
            </div>            
          </div>
        </div>

      </el-col>
      <el-col :span="7">
        <div class="chat-info">
          访问信息
          <ul>
          <li>xxxxx</li>
          <li>xxxxx</li>
          <li>xxxxx</li>
          </ul>

          访客信息
          <ul>
          <li>xxxxx</li>
          <li>xxxxx</li>
          <li>xxxxx</li>
          </ul>

          联系方式
          <ul>
          <li>xxxxx</li>
          <li>xxxxx</li>
          <li>浙江省 杭州市 西湖区 山水人家白沙岛 7-2-502室</li>
          </ul>

          自定义信息
          <ul>
          <li>xxxxx</li>
          <li>xxxxx</li>
          <li>xxxxx</li>
          </ul>

          标签
          <ul>
          <li>xxxxx</li>
          <li>xxxxx</li>
          <li>xxxxx</li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue';
  Vue.component('div-editor', {
    template: '<div contenteditable="true" class="inputor" v-on:input="updateValue($event.target.innerHTML)" v-on:keydown.enter="enter" style="width:100%; height:100%;">{{content}}</div>',
    props: {
      content:{}, 
      ctrl:{default: false}
    },
    methods: {
      updateValue: function(text) {
        // 这个触发了后 估计v-model特性内会处理 略神奇。。
        // https://cn.vuejs.org/v2/guide/components.html#使用自定义事件的表单输入组件
        this.$emit('input', text);
      },
      enter: function(event) {
        console.log(event);
        if(this.ctrl == event.ctrlKey) {
          //debugger;
          event.preventDefault();
          event.stopPropagation();
          this.$emit('enter');
        }
      }
    }
  });
  export default {
    props: ["height"],
    data () {
      return {
        text: "Hello World!",
        content: "z",
        ctrl: false
      }
    },
    computed: {
      panHeight: function() {
        var _h = this.height - 277;
        return _h + "px";
      },
      chat: function() {
        return this.$store.state.chat;
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
      send: function() {
        HORN.SendMsgText(this.chat.id, this.content, function(j) {
            console.log(j);
        }, function(j) {
            console.log(j);
        });
      },
      updateValue: function(text) {
        this.content = text;
        console.log(text);
      }
    }
  }
</script>

<style scoped>
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
}
.chat-editor {
  min-height: 200px;
}
.chat-editor-tool {
  height: 30px;
  border-bottom: 1px solid #efefef;
}
.chat-info {
  padding: 30px;
  font-size: 12px;
}
</style>