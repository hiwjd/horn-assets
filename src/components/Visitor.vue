<template>
    <div class="pad">
        <h3>在线访客</h3>

        <el-table
        :data="visitors"
        height="450"
        border
        style="width: 100%">
        <el-table-column
          inline-template
          label="访客"
          sortable
          width="180">
          <div>
            {{row.addr}}
            {{row.ip}}
          </div>
        </el-table-column>
        <el-table-column
          inline-template
          label="设备"
          width="180">
          <div>
            {{row.os}}
            {{row.browser}}
          </div>
        </el-table-column>
        <el-table-column
          inline-template
          label="来源">
          <div>
            {{row.referer}}
          </div>
        </el-table-column>
        <el-table-column
          inline-template
          label="正在访问"
          width="100">
          <div>
            <a target="_blank" :href="row.url">{{row.title}}</a>
          </div>
        </el-table-column>
        <el-table-column
          prop="tag2"
          label="标签2"
          width="100"
          :filters="[{ text: '家2', value: '家2' }, { text: '公司2', value: '公司2' }]"
          :filter-method="filterTag2"
          inline-template>
          <el-tag :type="row.tag2 === '家' ? 'primary' : 'success'" close-transition>{{row.tag2}}</el-tag>
        </el-table-column>
        <el-table-column
      inline-template
      :context="_self"
      label="操作"
      width="100">
      <span>
        <el-button @click="invite(row)" type="text" size="small">邀请对话</el-button>
      </span>
    </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        created () {
            var _self = this;
            this.$store.dispatch("fetchVisitors");
        },
        computed: {
            visitors() {
                return this.$store.state.visitors;
            }
        },
        methods: {
            filterTag2(value, row) {
              return row.tag2 === value;
            },
            invite(track) {
              HORN.InviteVisitorChat(track.vid, track.tid, function(j) {
                console.log(j);
              }, function() {
                console.error("InviteVisitorChat");
              });
              console.log(track);
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
</style>