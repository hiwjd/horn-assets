<template>
    <div class="pad">
    <div class="pad-head">{{settingTitle}}</div>

      <div class="pad-body">
        <el-tabs :active-name="settingName" @tab-click="change">

            <!-- 客服管理 开始 -->
            <el-tab-pane label="客服管理" name="staff">
              <div style="margin-bottom: 20px;">
                <el-button type="success" size="small" @click="fetchStaffs">刷新</el-button>
                <el-button type="primary" size="small" @click="staffFormDialog=true">添加</el-button>
              </div>

              <el-dialog title="客服管理" v-model="staffFormDialog" size="tiny" :show-close="showClose" :close-on-click-modal="showClose" :close-on-press-escape="showClose">
                <el-form :model="staffForm" :rules="staffRules" ref="staffForm" label-width="60px">
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="staffForm.email" auto-complete="off" size="small" :readonly="staffForm.sid!=''"></el-input>
                  </el-form-item>
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="staffForm.name" auto-complete="off" size="small"></el-input>
                  </el-form-item>
                  <el-form-item label="性别">
                    <el-radio-group v-model="staffForm.gender">
                      <el-radio label="男" value="男"></el-radio>
                      <el-radio label="女" value="女"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="手机">
                    <el-input v-model="staffForm.mobile" auto-complete="off" size="small"></el-input>
                  </el-form-item>
                  <el-form-item label="电话">
                    <el-input v-model="staffForm.tel" auto-complete="off" size="small"></el-input>
                  </el-form-item>
                  <el-form-item label="QQ">
                    <el-input v-model="staffForm.qq" auto-complete="off" size="small"></el-input>
                  </el-form-item>
                  <el-form-item label="分组">
                    <el-select v-model="staffForm.gid" placeholder="请选择">
                      <el-option
                        v-for="group in groups"
                        :label="group.name"
                        :value="group.gid">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <!--<el-form-item label="状态">
                    <el-select v-model="staffForm.status" placeholder="请选择账号状态">
                      <el-option label="正常" value="active"></el-option>
                      <el-option label="禁用" value="inactive"></el-option>
                    </el-select>
                  </el-form-item>-->
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button size="small" @click="staffManageCancel">取 消</el-button>
                  <el-button size="small" type="primary" @click="staffManageSave">确 定</el-button>
                </div>
              </el-dialog>

              <el-dialog title="修改密码" v-model="staffPwdFormDialog" size="tiny" :show-close="showClose" :close-on-click-modal="showClose" :close-on-press-escape="showClose">
                <el-form :model="staffPwdForm" :rules="staffPwdRules" ref="staffPwdForm" label-width="90px">
                  <el-form-item label="密码" prop="pwd">
                    <el-input type="password" v-model="staffPwdForm.pwd" auto-complete="off" size="small"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="repwd">
                    <el-input type="password" v-model="staffPwdForm.repwd" auto-complete="off" size="small"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button size="small" @click="staffPwdManageCancel">取 消</el-button>
                  <el-button size="small" type="primary" @click="staffPwdManageSave">确 定</el-button>
                </div>
              </el-dialog>

                <el-table
                    v-loading="staffTableLoading"
                    :data="staffs"
                    height="450"
                    border
                    style="width: 100%">
                    <el-table-column
                      prop="name"
                      label="姓名"
                      width="150">
                    </el-table-column>
                    <el-table-column
                      prop="gender"
                      label="性别"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="mobile"
                      label="手机"
                      width="150">
                    </el-table-column>
                    <el-table-column
                      prop="email"
                      label="邮箱"
                      width="190">
                    </el-table-column>
                    <el-table-column
                      prop="tel"
                      label="电话"
                      width="160">
                    </el-table-column>
                    <el-table-column
                      prop="qq"
                      label="QQ"
                      width="130">
                    </el-table-column>
                    <el-table-column
                      inline-template
                      prop="status"
                      label="账号状态"
                      width="100">
                      <span>
                      <span v-if="row.status=='active'">正常</span>
                      <span v-else>待激活</span>
                      </span>
                    </el-table-column>
                    <el-table-column
                      inline-template
                      :context="_self"
                      label="操作"
                      width="150">
                      <span>
                        <el-button type="text" size="small" @click="editStaff(row)">编辑</el-button>
                        <el-button type="text" size="small" @click="editStaffPwd(row)">设置密码</el-button>
                      </span>
                    </el-table-column>
                  </el-table>

                  <div style="margin-top: 20px;">
                    <el-pagination
                      @size-change="handleStaffSizeChange"
                      @current-change="handleStaffCurrentChange"
                      :current-page="staffPage"
                      :page-sizes="[2, 3, 4]"
                      :page-size="staffSize"
                      layout="sizes, prev, pager, next, jumper"
                      :total="staffTotal">
                    </el-pagination>
                  </div>
            </el-tab-pane>
            <!-- 客服管理 结束 -->

            <!-- 嵌入代码 开始 -->
            <el-tab-pane label="嵌入代码" name="embed">
              <p class="text-small" style="color:gray; font-size:13px;">嵌入以下代码到您的网站</p>
              <div>
              <textarea style="height:215px; width:295px; padding:10px; resize:none; border:none; outline:none; background:#efe;" onclick="this.select();" readonly>(function(w, d, n) {
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
_HORN('gid', '{{me.staff.gid}}');</textarea>
            </div>
            </el-tab-pane>
            <!-- 嵌入代码 结束 -->

            <!-- 分组管理 开始 -->
            <el-tab-pane label="分组管理" name="group">
              <div style="margin-bottom: 20px;">
                <el-button type="success" size="small" @click="fetchGroups">刷新</el-button>
                <el-button type="primary" size="small" @click="groupFormDialog=true">新增</el-button>
              </div>

              <el-dialog title="分组管理" v-model="groupFormDialog" size="tiny" :show-close="showClose" :close-on-click-modal="showClose" :close-on-press-escape="showClose">
                <el-form :model="groupForm" :rules="groupRules" ref="groupForm">
                  <el-form-item label="组名" prop="name">
                    <el-input v-model="groupForm.name" auto-complete="off" size="small"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button size="small" @click="groupManageCancel">取 消</el-button>
                  <el-button size="small" type="primary" @click="groupManageSave">确 定</el-button>
                </div>
              </el-dialog>

              <el-table
                v-loading="groupTableLoading"
                :data="groups"
                height="450"
                border>
                <el-table-column
                  prop="name"
                  label="组名"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="gid"
                  label="分组ID"
                  width="260">
                </el-table-column>
                <el-table-column
                  inline-template
                  :context="_self"
                  label="操作">
                  <span>
                    <el-button type="text" size="small" @click="editGroup(row)">编辑</el-button>
                    <!--<el-button type="text" size="small" @click="deleteGroup(row)">删除</el-button>-->
                  </span>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <!-- 分组管理 结束 -->

            <!-- 标签管理 开始 -->
            <el-tab-pane label="标签管理" name="tag">
              <div style="margin-bottom: 20px;">
                <el-button type="success" size="small" @click="fetchTags">刷新</el-button>
                <el-button type="primary" size="small" @click="tagFormDialog=true">新增</el-button>
              </div>

              <el-dialog title="标签管理" v-model="tagFormDialog" size="tiny" :show-close="showClose" :close-on-click-modal="showClose" :close-on-press-escape="showClose">
                <el-form :model="tagForm" :rules="tagRules" ref="tagForm">
                  <el-form-item label="颜色">
                    <span v-for="color in tagColors" @click="tagForm.color=color" :class="['el-tag', 'el-tag--'+color, {'tag-color-chosen':tagForm.color==color}, 'tag-color']"></span>
                  </el-form-item>
                  <el-form-item label="内容" prop="name">
                    <el-input v-model="tagForm.name" auto-complete="off" size="small"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button size="small" @click="tagManageCancel">取 消</el-button>
                  <el-button size="small" type="primary" @click="tagManageSave">确 定</el-button>
                </div>
              </el-dialog>

              <el-table
                v-loading="tagTableLoading"
                :data="tags"
                height="450"
                border
                style="">
                <el-table-column
                  inline-template
                  prop="name"
                  label="标签"
                  width="180">
                  <el-tag :type="row.color">{{row.name}}</el-tag>
                </el-table-column>
                <el-table-column
                  prop="ref_num"
                  label="使用次数"
                  width="180">
                </el-table-column>
                <el-table-column
                  inline-template
                  :context="_self"
                  label="操作"
                  width="100">
                  <span>
                    <el-button type="text" size="small" @click="editTag(row)">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteTag(row)">删除</el-button>
                  </span>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <!-- 标签管理 结束 -->

          </el-tabs>

        </div>
      </div>
</template>

<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.staffPwdForm.repwd !== '') {
            this.$refs.staffPwdForm.validateField('repwd');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.staffPwdForm.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        showClose: false,
        staffTableLoading: false,
        staffFormDialog: false,
        staffPwdFormDialog: false,
        staffForm: {
          sid: "",
          name: "",
          gender: "女",
          mobile: "",
          email: "",
          tel: "",
          qq: "",
          status: "pending",
          gid: ""
        },
        staffPwdForm: {
          sid: "",
          pwd: "",
          repwd: ""
        },

        staffTotal: 0,
        staffPage: 1,
        staffSize: 15,

        tagTableLoading: false,
        tagFormDialog: false,
        tagForm: {
          tagId: 0,
          name: '',
          color: ''
        },
        tagColors: ["", "gray", "primary", "warning", "danger", "success"],

        groupTableLoading: false,
        groupFormDialog: false,
        groupForm: {
          gid: "",
          name: ""
        },
        groups: [],

        formLabelWidth: '120px',
        
        settingNameMap: {
          "staff": "客服管理",
          "embed": "嵌入代码",
          "group": "分组管理",
          "tag": "标签管理"
        },

        staffRules: {
          name: [
            { required: true, message: '请输入客服名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '客服是通过邮箱登录的，需要客服登录邮箱激活账号', trigger: 'blur' }
          ]
        },
        tagRules: {
          name: [
            { required: true, message: '请输入标签内容', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ]
        },
        staffPwdRules: {
          pwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          repwd: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
        groupRules: {
          name: [
            { required: true, message: '请输入分组名', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当钩子执行前，组件实例还没被创建
        if(!to.params.name || ["staff","embed","group","tag"].indexOf(to.params.name) === -1) {
            next("/portal/setting/staff");
        } else {
            next();
        }
    },
    computed: {
        settingName: function() {
            return this.$route.params.name || "staff";
        },
        settingTitle: function() {
            return this.settingNameMap[this.$route.params.name || "staff"];
        },
        me: function() {
          return this.$store.state.me;
        },
        tags: function() {
          return this.$store.state.tags;
        },
        staffs: function() {
          return this.$store.state.staffs;
        }
    },
    created () {
      this.$store.dispatch("fetchStaffs");
      this.fetchGroups();
      // this.$store.subscribe((mutation, state) => {
      //   console.log(mutation.type)
      //   console.log(mutation.payload)
      // });
    },
    methods: {
        change: function(tab) {
            this.$router.push({path: "/portal/setting/"+tab.name});
        },

        // 标签管理相关
        fetchTags: function() {
            this.tagTableLoading = true;
            this.$store.dispatch("fetchTags").then((r) => {
              this.tagTableLoading = false;
            });
        },
        tagManageCancel: function() {
          this.tagFormDialog = false;
          this.resetTagForm();
          this.$refs.tagForm.resetFields();
        },
        tagManageSave: function() {
          this.$refs.tagForm.validate((valid) => {
            if (valid) {
              this.tagFormDialog = false;

              this.$store.dispatch("saveTag", {
                tagId: this.tagForm.tagId,
                name: this.tagForm.name,
                color: this.tagForm.color
              }).then(() => {
                this.fetchTags();
                this.$message("保存成功");
              });

              this.resetTagForm();
              this.$refs.tagForm.resetFields();
            } else {
            }
          });
        },
        resetTagForm: function() {
          this.tagForm.tagId = 0;
          this.tagForm.name = "";
          this.tagForm.color = "";
        },
        editTag: function(tag) {
          this.tagForm.tagId = tag.id;
          this.tagForm.name = tag.name;
          this.tagForm.color = tag.color;

          this.tagFormDialog = true;
        },
        deleteTag: function(tag) {
          this.$confirm('确认删除该标签?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            confirmButtonClass: 'el-button el-button--primary el-button--small',
            cancelButtonClass: 'el-button el-button--default el-button--small',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch("deleteTag", {tagId: tag.id}).then((vm) => {
              this.fetchTags();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            });
          }).catch(() => {
          });
        },

        // 客服管理相关
        fetchStaffs: function() {
          this.staffTableLoading = true;
          this.$store.dispatch("fetchStaffs", {page: this.staffPage, size:this.staffSize}).then((r) => {
            this.staffTotal = parseInt(r.total);
            this.staffTableLoading = false;
          });
        },
        staffManageCancel: function() {
          this.staffFormDialog = false;
          this.resetStaffForm();
          this.$refs.staffForm.resetFields();
          console.log("staffManageCancel");
        },
        staffManageSave: function() {
          this.$refs.staffForm.validate((valid) => {
            if (valid) {
              this.staffFormDialog = false;

              this.$store.dispatch("saveStaff", this.staffForm).then((vm) => {
                this.fetchStaffs();
                this.$message("保存成功");
              });

              this.resetStaffForm();
              this.$refs.staffForm.resetFields();
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetStaffForm: function() {
          this.staffForm.sid = "";
          this.staffForm.name = "";
          this.staffForm.gender = "女";
          this.staffForm.mobile = "";
          this.staffForm.email = "";
          this.staffForm.tel = "";
          this.staffForm.qq = "";
          this.staffForm.status = "pending";
          this.staffForm.gid = "";
        },
        editStaff: function(staff) {
          this.staffForm.sid = staff.sid;
          this.staffForm.name = staff.name;
          this.staffForm.gender = staff.gender;
          this.staffForm.mobile = staff.mobile;
          this.staffForm.email = staff.email;
          this.staffForm.tel = staff.tel;
          this.staffForm.qq = staff.qq;
          this.staffForm.status = staff.status;
          this.staffForm.gid = staff.gid;

          this.staffFormDialog = true;
        },
        handleStaffSizeChange: function(size) {
          this.staffSize = size;
          this.fetchStaffs();
        },
        handleStaffCurrentChange: function(page) {
          this.staffPage = page;
          this.fetchStaffs();
        },
        editStaffPwd: function(staff) {
          this.staffPwdForm.sid = staff.sid;
          this.staffPwdFormDialog = true;
        },
        staffPwdManageCancel: function() {
          this.staffPwdFormDialog = false;
          this.staffPwdForm.sid = "";
          this.$refs.staffPwdForm.resetFields();
          console.log("staffPwdManageCancel");
        },
        staffPwdManageSave: function() {
          this.$refs.staffPwdForm.validate((valid) => {
            if (valid) {
              this.staffPwdFormDialog = false;
              var 
                sid = this.staffPwdForm.sid,
                pwd = this.staffPwdForm.pwd,
                self = this;
              
              HORN.EditPass(sid, pwd, function(r) {
                self.fetchStaffs();
                self.$message("保存成功");
              }, function() {
                self.$message("保存失败");
              });

              this.staffPwdForm.sid = "";
              this.$refs.staffPwdForm.resetFields();
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },

        // 分组管理
        fetchGroups: function() {
          var self = this;
          this.groupTableLoading = true;
          HORN.FetchGroups(function(r) {
            self.groups = r;
            self.groupTableLoading = false;
          }, function() {
            self.groupTableLoading = false;
          });
        },
        groupManageSave: function() {
          this.$refs.groupForm.validate((valid) => {
            if (valid) {
              this.groupFormDialog = false;
              var 
                gid = this.groupForm.gid,
                name = this.groupForm.name,
                self = this;
              
              HORN.SaveGroup(gid, name, function(r) {
                self.fetchGroups();
                self.$message("保存成功");
              }, function() {
                self.$message("保存失败");
              });

              this.$refs.groupForm.resetFields();
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        groupManageCancel: function() {
          this.groupFormDialog = false;
          this.groupForm.gid = "";
          this.groupForm.name = "";
          this.$refs.groupForm.resetFields();
        },
        editGroup: function(group) {
          this.groupForm.gid = group.gid;
          this.groupForm.name = group.name;
          this.groupFormDialog = true;
        },
        deleteGroup: function() {
          // this.$confirm('确认删除该分组?', '提示', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   confirmButtonClass: 'el-button el-button--primary el-button--small',
          //   cancelButtonClass: 'el-button el-button--default el-button--small',
          //   type: 'warning'
          // }).then(() => {
          //   this.$store.dispatch("deleteTag", {tagId: tag.id}).then((vm) => {
          //     this.fetchTags();
          //     this.$message({
          //       type: 'success',
          //       message: '删除成功!'
          //     });
          //   });
          // }).catch(() => {
          // });
        }
    }
  };
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
  /*width: 100%;*/
}
.tag-color {
  cursor: pointer;
  margin: 5px;
  padding: 0px 11px;
}
.tag-color-chosen {
  padding: 3px 14px;
  height: 30px;
}
</style>