<template>
    <el-row>
      <el-col :span="5" v-bind:style="{ borderRight:'1px solid #efefef', height:computedHeight, background: '#fff', overflow: 'auto' }">
        <div class="chat-item" :class="{active: curUser.id == user.id}" v-for="user in users" @click="choseu(user, $event)">
          <el-row>
            <el-col :span="4">
              <img src="http://placehold.it/40x40">
            </el-col>
            <el-col :span="20">
              <div>
                {{user.addr}} {{user.msg}} 
              </div>
              <div>
                <el-tag type="gray">标签二</el-tag>
                <el-tag type="primary">标签三</el-tag>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="19" style="border-right:1px solid #efefef; height:100%;">
        <router-view :user="curUser" :height="height"></router-view>
      </el-col>
    </el-row>
</template>

<script>
  export default {
    created () {
      console.log("Chat.vue created");

      window.addEventListener('resize', this.handleResize)

      console.log(this.$route.params);
      for(var i=0; i<this.users.length; i++) {
        if(this.users[i].id == this.$route.params.uid) {
            this.curUser = this.users[i];
            break;
        }
      }
      console.log(this.curUser);
    },
    props: ["users"],
    data () {
        return {
            curUser: null,
            height: window.innerHeight
        }
    },
    methods: {
      choseu (curUser, e) {
        this.curUser = curUser;
        this.$router.push({ name:"chatcard", params: {uid: curUser.id, user:curUser}, meta: {user: curUser} });
      },
      handleResize: function(e) {
        this.height = window.innerHeight;
        this.width = window.innerWidth;
        //console.log(window.innerHeight, window.innerWidth);
      }
    },
    computed: {
        computedHeight: function() {
            return this.height + "px";
        }
    }
  }
</script>

<style scoped>
.chat-item {
  padding: 10px; 
  border-bottom:1px solid #efefef; 
  cursor:pointer;
  font-size: 12px;
  cursor: pointer;
}
.active {
  background-color: #fbfcfe;
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