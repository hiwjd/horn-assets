<template>
    <el-row>
      <el-col :span="17">
        <div class="chat-card">
        选择左侧对话
        </div>
      </el-col>
    </el-row>
</template>

<style scoped>
.chat-card {
  /*border: 1px solid #efefef;*/
  margin: 20px;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(52,63,75,.1);
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