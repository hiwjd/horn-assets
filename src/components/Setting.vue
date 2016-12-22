<template>
    <div class="pad">
        <h3>设置 {{activeName2}}</h3>

        <el-tabs :active-name="activeName2" @tab-click="change">
            <el-tab-pane label="客服管理" name="first">
                <el-table
                    :data="tableData3"
                    height="450"
                    border
                    style="width: 100%">
                    <el-table-column
                      prop="date"
                      label="日期"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="姓名"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="地址">
                    </el-table-column>
                  </el-table>
            </el-tab-pane>
            <el-tab-pane label="嵌入代码" name="second">
              <p class="text-small" style="color:gray;">嵌入以下代码到您的网站</p>
              <div>
              <textarea style="height:210px; width:295px; padding:10px; resize:none; border:none; outline:none; background:#efe;" onclick="this.select();" readonly>(function(w, d, n) {
    w[n] = w[n] || function() {
        (w[n].s = w[n].s || []).push(arguments);
    };

    var el = d.createElement("script"),
        s = d.getElementsByTagName("script")[0];
    el.async = true;
    el.charset = 'UTF-8';
    el.src = '//www.horn.com:9092/dst/horn.front.js';
    s.parentNode.insertBefore(el, s);
})(window, document, '_HORN');
_HORN('oid', {{me.oid}});
_HORN('sid', 'Hrr30lzGG7sEG7Sy8lQ');</textarea>
            </div>
            </el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="标签管理" name="fourth">
              <div>
              <el-button>新增</el-button>
              </div>
              <el-table
                :data="tags"
                height="450"
                border
                style="">
                <el-table-column
                  prop="name"
                  label="标签"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="ref_num"
                  label="使用次数"
                  width="180">
                </el-table-column>
                <el-table-column
                  inline-template
                  :context="_self"
                  label="操作">
                  <span>
                    <el-button type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small">删除</el-button>
                  </span>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
      </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        tags: []
      };
    },
    beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当钩子执行前，组件实例还没被创建
        if(!to.params.name) {
            next("/portal/setting/first");
        } else {
            next();
        }
    },
    computed: {
        activeName2: function() {
            return this.$route.params.name || "first";
        },
        me: function() {
          return this.$store.state.me;
        },
        tags: function() {
          return this.$store.state.tags;
        }
    },
    methods: {
        change: function(tab) {
            this.$router.push({path: "/portal/setting/"+tab.name});
        }
    }
  };
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
</style>