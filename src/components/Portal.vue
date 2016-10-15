<template>
    <div>
      <div class="left-nav">
        <span>HORN</span>
        <el-button type="primary" icon="search">ss</el-button>
      </div>
      <div class="right-body">
        <el-row>
          <el-col :span="6" style="border-right:1px solid #efefef; height:100%; background: #fff; height:100vh;">
            <div class="text item" v-for="a in us" style="padding: 10px; border-bottom:1px solid #efefef;">

              <el-row>
                <el-col :span="4">
                  <img src="http://placehold.it/40x40">
                </el-col>
                <el-col :span="20">
                  {{a.addr}} {{a.msg}} 
                  <el-tag type="gray">标签二</el-tag>
                  <el-tag type="primary">标签三</el-tag>
                </el-col>
              </el-row>
              
            </div>
          </el-col>
          <el-col :span="18" style="border-right:1px solid #efefef; height:100%;">
            <el-row>
              <el-col :span="17">
                
                <div class="chat-card">
                  <div class="chat-tool">四川成都 12.23.34.45</div>
                  <div class="chat-tip">正在浏览 <a href="#">功能介绍</a></div>
                  <div class="chat-pan">
                    <ul>
                      <li>你好</li>
                      <li>请问有什么能帮到您的</li>
                      <li>我想退货，该如何操作？</li>
                      <li>稍等</li>
                    </ul>
                  </div>
                  <div class="chat-editor">
                    <div class="chat-editor-tool"></div>
                    <div class="chat-editor-input">
                      <textarea>输入中..</textarea>
                    </div>
                  </div>
                </div>

              </el-col>
              <el-col :span="7">
                <div class="chat-info">
                  访问信息
                  <ul>
                  <li>1. xxxxx</li>
                  <li>1. xxxxx</li>
                  <li>1. xxxxx</li>
                  </ul>

                  访客信息
                  <ul>
                  <li>1. xxxxx</li>
                  <li>1. xxxxx</li>
                  <li>1. xxxxx</li>
                  </ul>

                  联系方式
                  <ul>
                  <li>1. xxxxx</li>
                  <li>1. xxxxx</li>
                  <li>浙江省 杭州市 西湖区 山水人家白沙岛 7-2-502室</li>
                  </ul>

                  自定义信息
                  <ul>
                  <li>1. xxxxx</li>
                  <li>1. xxxxx</li>
                  <li>1. xxxxx</li>
                  </ul>

                  标签
                  <ul>
                  <li>1. xxxxx</li>
                  <li>1. xxxxx</li>
                  <li>1. xxxxx</li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
  export default {
    created () {
      console.log("Signup.vue created");
    },
    data () {
        return {
            us: [{"addr":"广东深圳","msg":"你好，有人在吗？"},{"addr":"四川成都","msg":"支付还是不成功，是不是哪里出问题"},{"addr":"浙江杭州","msg":"请问怎么退货"}]
        }
    }
  }
</script>

<style scoped>
.left-nav {
  width: 80px;
  height: 100%;
  border-right: 1px solid #efefef;
  float: left;
  box-sizing: border-box;
  background-color: #343f4b;
  color: #fff;
  position: fixed;
}
.right-body {
  width: calc(100% - 80px);
  height: auto;
  position: absolute;
  right: 0;
  background: #f2f3f5;
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