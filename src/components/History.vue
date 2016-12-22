<template>
    <div class="pad">
        <h3>历史对话</h3>

        <el-row :gutter="20">

          <el-col :span="8">

            <el-form ref="form" :model="form" label-width="40px">
              <el-form-item label="搜索">
                <el-input
                  placeholder="请输入内容"
                  v-model="input">
                </el-input>
              </el-form-item>
            </el-form>

            <el-table
              :data="chats"
              height="450"
              border
              style="width: 100%">
              <el-table-column
                inline-template
                label="对话"
                sortable>
                <div>
                  {{row.cid}}
                </div>
              </el-table-column>
              <el-table-column
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
              </el-table-column>
              <el-table-column
                inline-template
                :context="_self"
                label="操作"
                width="100">
                <span>
                  <el-button @click="invite(row)" type="text" size="small">查看对话</el-button>
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

          <el-col :span="16">
            <el-card class="box-card" :body-style="{padding:0}">
              <div class="el-row">
                <div class="el-col el-col-17">
                  <div class="chat-card">
                    <div class="chat-tool">浙江杭州</div>
                    <div class="chat-tip">MacOS Chrome 正在浏览 <a target="_blank" href="http://www.horn.com:9092/demo.html?key=abc">demo.html</a> IP:101.71.255.226</div>
                    <div class="chat-pan" style="height: 450px; overflow: auto;">
                      <div class="message request_chat">
                        <div class="m-from">
                          <span class="m-name">&nbsp;</span>
                          <span class="m-time">早上08:04</span>
                        </div>
                        <div class="m-text"></div>
                      </div>
                      <div class="message join_chat me">
                        <div class="m-from">
                          <span class="m-name">&nbsp;</span>
                          <span class="m-time">早上08:04</span>
                        </div>
                        <div class="m-text"></div>
                      </div>
                      <div class="message text me">
                        <div class="m-from">
                          <span class="m-name">&nbsp;</span>
                          <span class="m-time">早上08:05</span>
                        </div>
                        <div class="m-text">Http 缓存机制作为 web 性能优化的重要手段，对从事 Web 开发的小伙伴们来说是必须要掌握的知识，但最近我遇到了几个缓存头设置相关的题目，发现有好几道题答错了，有的甚至在知道了正确答案后依然不明白其原因，可谓相当的郁闷呢！！</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="el-col el-col-7">
                  <div class="chat-info">
                    <div class="infocard">
                      <div class="infocard-head">访问轨迹</div>
                      <div class="infocard-body">
                        <div><a target="_blank" href="http://www.horn.com:9092/demo.html?key=abc">2 天前 demo.html</a></div>
                        <div><a target="_blank" href="http://www.horn.com:9092/demo.html?x=2">2 天前 demo.html</a></div>
                        <div><a target="_blank" href="http://www.horn.com:9092/demo.html?x=1">2 天前 demo.html</a></div>
                        <div><a target="_blank" href="http://www.horn.com:9092/demo.html?x=2">2 天前 demo.html</a></div>
                        <div><a target="_blank" href="http://www.horn.com:9092/demo.html?x=2">2 天前 demo.html</a></div>
                      </div>
                    </div>
                    <div class="infocard">
                      <div class="infocard-head">访客信息</div>
                      <div class="infocard-body">
                        <div>指纹 76c55e82ebb69eb30e679ac0ea1de8d8</div>
                        <div>VID ecp9ZJX0v2pUgxepM8MBB9I</div>
                        <div>IP 101.71.255.226</div>
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
                        <span class="el-tag el-tag--primary">标签三<!----></span>
                        <span class="el-tag el-tag--success">标签四<!----></span>
                        <span class="el-tag el-tag--warning">标签五<!----></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>

        </el-row>

    </div>
</template>

<script>
    export default {
        created () {
            this.fetchChats();
            console.log("历史对话");
        },
        data () {
            return {
                page: 1,
                size: 2,
                total: 0,
                form: {},
                input: "",
                height: window.innerHeight,
                chats: []
            }
        },
        computed: {
            computedHeight: function() {
              return this.height + "px";
            },
            chat: function() {
              return this.$store.state.chat;
            }
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
          handleSizeChange: function(size) {
            this.size = size;
            this.fetchChats();
          },
          handleCurrentChange: function(page) {
            this.page = page;
            this.fetchChats();
          },
          fetchChats: function() {
            var _self = this;
            this.$http.get("/api/b/history/chats?size="+this.size+"&page="+this.page).then(function(res) {
              _self.chats = res.data.data;
              _self.total = parseInt(res.data.total);
            }).catch(function(err) {
              console.log(err);
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
</style>