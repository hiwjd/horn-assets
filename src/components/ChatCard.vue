<template>
  <el-row>
      <el-col :span="17">
        
        <div class="chat-card" v-if="chat">
          <div class="chat-tool">{{track.addr}}</div>
          <div class="chat-tip">{{track.os}} {{track.browser}} 正在浏览 <a target="_blank" :href="track.url">{{track.title}}</a> IP:{{track.ip}}</div>
          <div class="chat-pan" v-bind:style="{ height: panHeight, overflow: 'auto' }">
            <div v-for="m in chat.msgs" class="message" :class="[m.type, {me:m.from.uid==me.sid}]">
              <div class="m-from">
                <span class="m-name">{{m.from.name||'&nbsp;'}}</span>
                <span class="m-time">{{m.created_at|msgtime}}</span>
              </div>
              <div class="m-text" v-if="m.type=='text'">{{m.text}}</div>
              <div class="m-text" v-if="m.type=='file'"><a :href="m.file.src" target="_blank">{{m.file.name}}</a></div>
              <div class="m-text" v-if="m.type=='image'"><img :src="m.image.src" style="max-width:50%;" /></div>
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
              <span id="container">
                <a href="#" id="pickfiles"><i style="font-size:17px; color:#aaa;" class="el-icon-document"></i></a>
                <!-- <el-button icon="upload" id="pickfiles" size="mini" type="info"></el-button> -->
              </span>
              <el-checkbox v-model="ctrl" style="float:right;">CTRL+回车发送</el-checkbox>
            </div>
            <div class="chat-editor-input">
              <textarea class="inputor" v-model="content" v-on:keydown.enter="enter" v-bind:style="{ height: '149px' }"></textarea>
            </div>
          </div>
        </div>

      </el-col>
      <el-col :span="7">
        <div class="chat-info" v-if="chat">

          <div class="infocard">
            <div class="infocard-head">访问轨迹</div>
            <div class="infocard-body">
              <div v-for="t in chat.tracks">
                <a target="_blank" :href="t.url">{{t.created_at|moment_fromnow}} {{t.title}}</a>
              </div>
            </div>
          </div>

          <div class="infocard">
            <div class="infocard-head">访客信息</div>
            <div class="infocard-body">
              <div>
                <span class="visitor-info-label">姓名</span>
                <input class="visitor-info-editor" type="text" name="name" v-model.lazy="visitorName">
              </div>
              <div>
                <span class="visitor-info-label">性别</span>
                <!-- <input class="visitor-info-editor" type="text" name="gender" v-model.lazy="visitorGender"> -->
                <select class="visitor-info-editor" name="gender" v-model.lazy="visitorGender">
                  <option value="未知">未知</option>
                  <option value="男">男</option>
                  <option value="女">女</option>
                </select>
              </div>
              <div>
                <span class="visitor-info-label">年龄</span>
                <input class="visitor-info-editor" type="text" name="age" v-model.number.lazy="visitorAge">
              </div>
              <div>
                <span class="visitor-info-label">手机</span>
                <input class="visitor-info-editor" type="text" name="mobile" v-model.lazy="visitorMobile">
              </div>
              <div>
                <span class="visitor-info-label">邮箱</span>
                <input class="visitor-info-editor" type="text" name="email" v-model.lazy="visitorEmail">
              </div>
              <div>
                <span class="visitor-info-label">QQ</span>
                <input class="visitor-info-editor" type="text" name="qq" v-model.lazy="visitorQQ">
              </div>
              <div>
                <span class="visitor-info-label">地址</span>
                <input class="visitor-info-editor" type="text" name="addr" v-model.lazy="visitorAddr">
              </div>
              <div>
                <span class="visitor-info-label">备注</span>
                <input class="visitor-info-editor" type="text" name="note" v-model.lazy="visitorNote">
              </div>
            </div>
          </div>

          <!-- <div class="infocard">
            <div class="infocard-head">自定义信息</div>
            <div class="infocard-body">
              <div>xxxxx</div>
              <div>xxxxx</div>
              <div>xxxxx</div>
            </div>
          </div> -->

          <el-popover
            ref="popover5"
            placement="top"
            width="160"
            v-model="tagPopVisible">
            <div>
              <span v-if="allTags.length==0">无标签</span>
              <span v-else v-for="tag in allTags" :class="['el-tag', 'el-tag--'+tag.color]" @click="attachTag(tag)" style="cursor:pointer; margin:5px;">{{tag.name}}</span>
            </div>
          </el-popover>

          <div class="infocard">
            <div class="infocard-head">标签 <el-button type="info" size="mini" :plain="true" icon="plus" v-popover:popover5></el-button></div>
            <div class="infocard-body">
              <el-tag v-for="tag in tags" :type="tag.color" style="margin:5px;" :closable="true" @close="detachTag(tag)">{{tag.name}}</el-tag>
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
        ctrl: false,
        tagPopVisible: false
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
      tags: function() {
        return this.$store.state.chat.tags;
      },
      track: function() {
        return this.$store.state.chat.tracks[0];
      },
      visitorName: {
        get () {
          return this.$store.state.chat.visitor.name;
        },
        set (value) {
          this.saveVisitorInfo(this.visitor.vid, "name", value);
        }
      },
      visitorGender: {
        get () {
          return this.$store.state.chat.visitor.gender;
        },
        set (value) {
          this.saveVisitorInfo(this.visitor.vid, "gender", value);
        }
      },
      visitorAge: {
        get () {
          return this.$store.state.chat.visitor.age;
        },
        set (value) {
          this.saveVisitorInfo(this.visitor.vid, "age", value);
        }
      },
      visitorMobile: {
        get () {
          return this.$store.state.chat.visitor.mobile;
        },
        set (value) {
          this.saveVisitorInfo(this.visitor.vid, "mobile", value);
        }
      },
      visitorEmail: {
        get () {
          return this.$store.state.chat.visitor.email;
        },
        set (value) {
          this.saveVisitorInfo(this.visitor.vid, "email", value);
        }
      },
      visitorQQ: {
        get () {
          return this.$store.state.chat.visitor.qq;
        },
        set (value) {
          this.saveVisitorInfo(this.visitor.vid, "qq", value);
        }
      },
      visitorAddr: {
        get () {
          return this.$store.state.chat.visitor.addr;
        },
        set (value) {
          this.saveVisitorInfo(this.visitor.vid, "addr", value);
        }
      },
      visitorNote: {
        get () {
          return this.$store.state.chat.visitor.note;
        },
        set (value) {
          this.saveVisitorInfo(this.visitor.vid, "note", value);
        }
      },
      visitor: function() {
        return this.$store.state.chat.visitor;
      },
      me: function() {
        return this.$store.state.me;
      },
      allTags: function() {
        if(!this.tags) {
          return this.$store.state.tags;
        }

        var self = this;
        return this.$store.state.tags.filter(function(tag) {
          return self.tags.indexOf(tag) == -1;
        });
      }
    },
    created () {
      console.log("ChatCard.vue created");
    },
    mounted: function() {
      var self = this;
      setTimeout(function(){
        //debugger;
      var uploader = Qiniu.uploader({
          runtimes: 'html5,flash,html4',      // 上传模式,依次退化
          browse_button: 'pickfiles',         // 上传选择的点选按钮，**必需**
          // 在初始化时，uptoken, uptoken_url, uptoken_func 三个参数中必须有一个被设置
          // 切如果提供了多个，其优先级为 uptoken > uptoken_url > uptoken_func
          // 其中 uptoken 是直接提供上传凭证，uptoken_url 是提供了获取上传凭证的地址，如果需要定制获取 uptoken 的过程则可以设置 uptoken_func
          // uptoken : '', // uptoken 是上传凭证，由其他程序生成
          uptoken_url: 'https://app.hiyueliao.com/api/uptoken',         // Ajax 请求 uptoken 的 Url，**强烈建议设置**（服务端提供）
          // uptoken_func: function(file){    // 在需要获取 uptoken 时，该方法会被调用
          //    // do something
          //    return uptoken;
          // },
          get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的 uptoken
          // downtoken_url: '/downtoken',
          // Ajax请求downToken的Url，私有空间时使用,JS-SDK 将向该地址POST文件的key和domain,服务端返回的JSON必须包含`url`字段，`url`值为该文件的下载地址
          // unique_names: true,              // 默认 false，key 为文件名。若开启该选项，JS-SDK 会为每个文件自动生成key（文件名）
          // save_key: true,                  // 默认 false。若在服务端生成 uptoken 的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
          domain: 'f1stxtgl',     // bucket 域名，下载资源时用到，**必需**
          container: 'container',             // 上传区域 DOM ID，默认是 browser_button 的父元素，
          max_file_size: '100mb',             // 最大文件体积限制
          flash_swf_url: '//cdn.staticfile.org/plupload/2.1.1/Moxie.swf',  //引入 flash,相对路径
          max_retries: 3,                     // 上传失败最大重试次数
          dragdrop: true,                     // 开启可拖曳上传
          drop_element: 'container',          // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
          chunk_size: '4mb',                  // 分块上传时，每块的体积
          auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
          //x_vars : {
          //    自定义变量，参考http://developer.qiniu.com/docs/v6/api/overview/up/response/vars.html
          //    'time' : function(up,file) {
          //        var time = (new Date()).getTime();
                    // do something with 'time'
          //        return time;
          //    },
          //    'size' : function(up,file) {
          //        var size = file.size;
                    // do something with 'size'
          //        return size;
          //    }
          //},
          init: {
              'FilesAdded': function(up, files) {
                  plupload.each(files, function(file) {
                      // 文件添加进队列后,处理相关的事情
                  });
              },
              'BeforeUpload': function(up, file) {
                     // 每个文件上传前,处理相关的事情
              },
              'UploadProgress': function(up, file) {
                     // 每个文件上传时,处理相关的事情
              },
              'FileUploaded': function(up, file, info) {
                debugger;
                     // 每个文件上传成功后,处理相关的事情
                     // 其中 info 是文件上传成功后，服务端返回的json，形式如
                     // {
                     //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                     //    "key": "gogopher.jpg"
                     //  }
                     // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

                     //var domain = up.getOption('domain');
                     var res = JSON.parse(info);
                     var sourceLink = "https://f1.stxtgl.com/" + res.key; // 获取上传成功后的文件的Url

                     if(["image/png","image/jpg","image/jpeg"].indexOf(file.type) > -1) {
                        HORN.SendMsgImage(self.chat.cid, sourceLink, file.size, 0, 0, function() {
                          console.log(arguments);
                        }, function(){
                          console.error(arguments);
                        });
                     } else {
                        HORN.SendMsgFile(self.chat.cid, file.name, sourceLink, file.size, function() {
                          console.log(arguments);
                        }, function(){
                          console.error(arguments);
                        });
                      }
              },
              'Error': function(up, err, errTip) {
                debugger;
                     //上传出错时,处理相关的事情
              },
              'UploadComplete': function() {
                     //队列文件处理完毕后,处理相关的事情
              },
              'Key': function(up, file) {
                //debugger;
                  // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                  // 该配置必须要在 unique_names: false , save_key: false 时才生效

                  var key = "chat/attach/"+self.chat.cid+"/"+file.name;
                  // do something with key here
                  return key
              }
          }
      });
      }, 2000);

      // domain 为七牛空间（bucket)对应的域名，选择某个空间后，可通过"空间设置->基本设置->域名设置"查看获取

      // uploader 为一个 plupload 对象，继承了所有 plupload 的方法，参考http://plupload.com/docs
    },
    watch: {
      'chat.cid': function(cid) {
        console.log("chat change " + cid);
        this.$store.dispatch("fetchVisitorTags", {cid: cid});
      },
      'chat.msgs': function() {
        console.log("chat.msgs change");
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
      },
      detachTag: function(tag) {
        this.$store.dispatch("detachTag", {tag: tag});
      },
      attachTag: function(tag) {
        this.$store.dispatch("attachTag", {tag: tag});
        this.tagPopVisible = false;
      },
      saveVisitorInfo: function(vid, key, value) {
        if(this.visitor[key] != value) {
          var data = {};
          data[key] = value;
          this.$store.dispatch("updateVisitorInfo", {vid: vid, data: data});
        }
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
.visitor-info-editor {
  border: none;
  background: #F9FAFC;
}
.visitor-info-editor:focus {
  background: #fff9c2;
  outline: none; 
}
.visitor-info-label {
  width: 30px;
  display: inline-block;
  color: gray;
}
</style>