<template>
  <el-row>
      <el-col :span="17">
        
        <div class="chat-card">
          <div class="chat-tool">{{user.id}}</div>
          <div class="chat-tip">正在浏览 <a href="#">功能介绍</a></div>
          <div class="chat-pan" v-bind:style="{ height: panHeight, overflow: 'auto' }">
            <ul>
              <li v-for="m in user.msgs">
                <pre v-if="m.type=='text'">{{m.text}}</pre>
                <pre v-if="m.type=='image'">图片{{m.image.src}}</pre>
                <pre v-if="m.type=='file'">文件{{m.file.src}}</pre>
              </li>
            </ul>
          </div>
          <div class="chat-editor">
            <div class="chat-editor-tool"></div>
            <div class="chat-editor-input">
              <textarea>ssss</textarea>
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
  export default {
    props: ["user", "height"],
    data () {
      return {
        text: "Hello World!"
      }
    },
    computed: {
      panHeight: function() {
        var _h = this.height - 226;
        return _h + "px";
      }
    },
    created () {
      console.log("ChatCard.vue created");
    },
    watch: {
      'user.msgs': function() {
        this.$nextTick(function() {
          var chatpan = this.$el.querySelector(".chat-pan");
          if(chatpan) {
            chatpan.scrollTop = chatpan.scrollHeight;
          }
        });
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
  min-height: 150px;
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