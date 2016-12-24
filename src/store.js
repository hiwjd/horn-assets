import Vue from 'vue'
import Vuex from 'vuex'
import createHORNPlugin from './store_plugin_horn.js'

Vue.use(Vuex)

const plugin = createHORNPlugin(HORN)

export default new Vuex.Store({
  strict: true,
  state: {
    me: {},
    version: "", // 全量同步状态时的版本，增量变更根据这个版本来判断是不是要适配
    chats: {}, // 所有的对话，键是对话ID
    chat: null, // 当前的对话
    visitors: [], // 所有的访客
    visitorsIndex: {}, // 访客以ID为索引
    tags: [],
    staffs: []
  },
  mutations: {
    addChat (state, payload) {
        //if(payload.chat.mid > state.version) {
            Vue.set(state.chats, payload.chat.cid, payload.chat);
        //}
    },
    addMsg (state, payload) {
        var msg = payload.msg,
            chat = state.chats[msg.cid];

        if(chat && msg.mid > state.version) {
            chat.msgs.push(msg);
        }
    },
    choseChat (state, payload) {
        state.chat = payload.chat;
    },
    setVersion (state, payload) {
        state.version = payload.version;
    },
    fetchVisitors (state, payload) {
        state.visitors = payload;
        for(var i=0; i<payload.length; i++) {
            state.visitorsIndex[payload[i].vid] = payload[i];
        }
    },
    updateVisitor (state, payload) {
        //debugger;
        var v = state.visitorsIndex[payload.vid];
        if(v) {
            for(var key in payload) {
                Vue.set(state.visitorsIndex[payload.vid], key, payload[key]);
            }
        } else {
            state.visitors.push(payload);
            state.visitorsIndex[payload.vid] = payload;
        }
    },
    setMe (state, payload) {
        state.me = payload.me;
    },
    detachTag (state, payload) {
        state.chat.tags.splice(state.chat.tags.indexOf(payload.tag), 1);
    },
    attachTag (state, payload) {
        state.chat.tags.push(payload.tag);
    },
    fetchVisitorTags (state, payload) {
        Vue.set(state.chat, 'tags', payload.tags);
    },
    fetchTags (state, payload) {
        state.tags = payload.tags;
    },
    updateVisitorInfo (state, payload) {
        //var visitor = state.visitorsIndex[payload.vid];
        Vue.set(state.chat.visitor, payload.name, payload.value);
    },
    saveStaff (state, payload) {
        state.staffs.push(payload);
    },
    fetchStaffs (state, payload) {
        state.staffs = payload;
    }
  },
  actions: {
    addChat (context, payload) {
        context.commit('addChat', payload);
    },
    addMsg (context, payload) {
        context.commit('addMsg', payload);
    },
    choseChat (context, payload) {
        context.commit('choseChat', payload);
    },
    setVersion (context, payload) {
        context.commit('setVersion', payload);
    },
    fetchVisitors (context, payload) {
        HORN.GetOnlineUserList(function(r) {
            context.commit('fetchVisitors', r.data);
        }, function(err) {
            alert(err);
        });
    },
    updateVisitor (context, payload) {
        context.commit('updateVisitor', payload);
    },
    setMe (context, payload) {
        context.commit('setMe', payload);
    },
    detachTag (context, payload) {
        HORN.DetachTag(context.state.chat.vid, payload.tag.id, function() {
            context.commit('detachTag', payload);
        });
    },
    attachTag (context, payload) {
        HORN.AttachTag(context.state.chat.vid, payload.tag.id, function() {
            context.commit('attachTag', payload);
        });
    },
    fetchVisitorTags (context, payload) {
        var self = this;
        var cid = payload.cid;

        if(typeof context.state.chat.tags != "undefined") {
            return;
        }

        HORN.GetTagsByVid(context.state.chat.vid, function(r) {
            console.log("action.fetchVisitorTags");
            context.commit('fetchVisitorTags', {tags: r});
        });

        // setTimeout(function() {
        //   console.log("action.fetchVisitorTags");
        //   context.commit('fetchVisitorTags', {tags: [{name:"好客户",color:"primary"}]});
        // }, 800);
    },
    fetchTags (context, payload) {
        return new Promise((resolve, reject) => {
          HORN.GetTags(function(r) {
            context.commit("fetchTags", {tags: r});
            resolve(r);
          });
        });
    },
    saveTag (context, payload) {
        return new Promise((resolve, reject) => {
          HORN.SaveTag(payload.tagId, payload.name, payload.color, function(r) {
            //context.commit("fetchTags", {tags: r});
            resolve();
          });
        });
    },
    deleteTag (context, payload) {
        return new Promise((resolve, reject) => {
          HORN.DeleteTag(payload.tagId, function(r) {
            //context.commit("fetchTags", {tags: r});
            resolve();
          });
        });
    },
    updateVisitorInfo (context, payload) {
        return new Promise((resolve, reject) => {
          HORN.DeleteTag(payload.name+":"+payload.value, function(r) {
            //context.commit("fetchTags", {tags: r});
            resolve();
          });
        });
    },
    saveStaff (context, payload) {
        return new Promise((resolve, reject) => {
            HORN.SaveStaff(payload, function(r) {
                payload.id = r.id;
                context.commit("saveStaff", payload);
                resolve();
            });
        });
    },
    fetchStaffs (context, payload) {
        return new Promise((resolve, reject) => {
            HORN.FetchStaffs(payload, function(r) {
                //debugger;
                context.commit("fetchStaffs", r.data);
                resolve(r);
            });
        });
    }
  },
  plugins: [plugin]
});