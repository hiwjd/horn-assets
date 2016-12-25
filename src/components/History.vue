<template>
    <div class="pad">
        <div class="pad-head">历史对话</div>

        <el-row>

          <el-col :span="8" style="padding:20px; border-right:1px solid #efefef;">
            <el-form ref="searchForm" :model="searchForm" label-width="40px">
              <el-form-item label="日期">
                <el-date-picker
                  v-model="searchForm.date"
                  type="daterange"
                  align="right"
                  placeholder="选择日期范围"
                  :picker-options="datePickerOptions"
                  style="width: 220px">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="搜索">
                <el-row>
                  <el-col :span="18">
                    <el-input
                      placeholder="可以搜索客服姓名"
                      v-model="searchForm.input">
                    </el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-button style="margin-left:10px;" @click="fetchChats">搜索</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>

            <el-table
              v-loading="loadingChats"
              :data="chats"
              :height="chatTableHeight"
              border
              style="width: 100%">
              <el-table-column
                inline-template
                label="对话信息">
                <div style="font-size:12px;">
                  <div>访客: <span>{{row.visitor_name}}</span></div>
                  <div>客服: <span>{{row.staff_name}}</span></div>
                  <div>开始时间: <span>{{row.created_at}}</span></div>
                  <div>结束时间: <span>{{row.ended_at}}</span></div>
                </div>
              </el-table-column>
              <!-- <el-table-column
                inline-template
                label="访客">
                <div>
                  {{row.vid}}
                </div>
              </el-table-column>
              <el-table-column
                inline-template
                label="客服">
                <div>
                  {{row.sid}}
                </div>
              </el-table-column> -->
              <el-table-column
                inline-template
                :context="_self"
                label="操作"
                width="90">
                <span>
                  <el-button @click="viewchat(row)" type="text" size="small">查看对话</el-button>
                </span>
              </el-table-column>
            </el-table>

            <div style="margin-top: 20px;">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[2, 3, 4]"
                :page-size="size"
                layout="sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>

          </el-col>

          <el-col :span="16" v-loading="loadingChat">

            <div class="el-row" v-show="chat.cid!=''">
              <div class="el-col el-col-17">
                <div class="chat-card">
                  <div class="chat-tool">{{track.addr}}</div>
                  <div class="chat-tip">{{track.os}} {{track.browser}} 正在浏览 <a target="_blank" :href="track.url">{{track.title}}</a> IP:{{track.ip}}</div>
                  <div class="chat-pan" v-bind:style="{height: chatPanHeight, overflow: 'auto'}">
                    <div v-for="m in chat.msgs" class="message" :class="[m.type, {me:m.from.role=='staff'}]">
                      <div class="m-from">
                        <span class="m-name">{{m.from.name||'&nbsp;'}}</span>
                        <span class="m-time">{{m.created_at|msgtime}}</span>
                      </div>
                      <div class="m-text">{{m.text}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="el-col el-col-7">
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
                      <div>
                        <span class="visitor-info-label">姓名</span>
                        <span class="visitor-info-editor">{{chat.visitor.name}}</span>
                      </div>
                      <div>
                        <span class="visitor-info-label">性别</span>
                        <span class="visitor-info-editor">{{chat.visitor.gender}}</span>
                      </div>
                      <div>
                        <span class="visitor-info-label">年龄</span>
                        <span class="visitor-info-editor">{{chat.visitor.age}}</span>
                      </div>
                      <div>
                        <span class="visitor-info-label">手机</span>
                        <span class="visitor-info-editor">{{chat.visitor.mobile}}</span>
                      </div>
                      <div>
                        <span class="visitor-info-label">邮箱</span>
                        <span class="visitor-info-editor">{{chat.visitor.email}}</span>
                      </div>
                      <div>
                        <span class="visitor-info-label">QQ</span>
                        <span class="visitor-info-editor">{{chat.visitor.qq}}</span>
                      </div>
                      <div>
                        <span class="visitor-info-label">地址</span>
                        <span class="visitor-info-editor">{{chat.visitor.addr}}</span>
                      </div>
                      <div>
                        <span class="visitor-info-label">备注</span>
                        <span class="visitor-info-editor">{{chat.visitor.note}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="infocard">
                    <div class="infocard-head">标签</div>
                    <div class="infocard-body">
                      <el-tag v-for="tag in chat.tags" :type="tag.color" style="margin:5px;">{{tag.name}}</el-tag>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-show="chat.cid==''">
              <center style="color: #99A9BF; font-size: 14px; margin:150px;">左侧选择对话进行查看</center>
            </div>

          </el-col>

        </el-row>

    </div>
</template>

<script>
    export default {
        created () {
          window.addEventListener('resize', this.handleResize)
          this.fetchChats();
        },
        data () {
            return {
                page: 1,
                size: 2,
                total: 0,
                height: window.innerHeight,
                chats: [],
                loadingChat: false,
                loadingChats: false,
                chat: {
                  cid: "",
                  tracks: [],
                  msgs: [],
                  visitor: {},
                  tags: []
                },
                chatListHeight: 450,
                searchForm: {
                  date: ["", ""],
                  input: ""
                },
                datePickerOptions: {
                  shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                      picker.$emit('pick', [start, end]);
                    }
                  }, {
                    text: '最近一个月',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                      picker.$emit('pick', [start, end]);
                    }
                  }, {
                    text: '最近三个月',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                      picker.$emit('pick', [start, end]);
                    }
                  }]
                }
            }
        },
        computed: {
            chatTableHeight: function() {
              return this.height - 273;
            },
            chatPanHeight: function() {
              var _h = this.height - 163;
              return _h+"px";
            },
            track: function() {
              return this.chat.tracks.length==0 ? {} : this.chat.tracks[0];
            }
        },
        methods: {
          handleResize: function(e) {
            this.height = window.innerHeight;
          },
          handleSizeChange: function(size) {
            this.size = size;
            this.fetchChats();
          },
          handleCurrentChange: function(page) {
            this.page = page;
            this.fetchChats();
          },
          fetchChats: function() {
            var self = this;
            this.loadingChats = true;

            var data = {
              search: this.searchForm.input,
              ds: this.searchForm.date[0],
              de: this.searchForm.date[1],
              page: this.page,
              size: this.size
            };
            HORN.FetchChats(data, function(res) {
              self.loadingChats = false;
              self.chats = res.data;
              self.total = parseInt(res.total);
            }, function() {
              self.loadingChats = false;
            });
          },
          viewchat: function(chat) {
            this.chatListHeight = 550;
            var self = this;
            this.loadingChat = true;
            HORN.FetchChat(chat.cid, function(res) {
              self.loadingChat = false;
              self.chat = res;
            }, function() {
              self.loadingChat = false;
            });
          }
        }
    }
</script>

<style scoped>
h3 {
    margin-top: 0;
}
.pad {
    /*padding: 20px;*/
}
.pad-head {
  padding: 20px;
  border-bottom: 1px solid #efefef;
}
.pad-body {
  padding: 20px;
}
.el-tabs {
  width: 100%;
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
  /*border-bottom: 1px solid #efefef;*/
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