import Vue from 'vue'
import Vuex from 'vuex'
import createHORNPlugin from './store_plugin_horn.js'

Vue.use(Vuex)

const plugin = createHORNPlugin(HORN)

export default new Vuex.Store({
  state: {
    me: {},
    version: "", // 全量同步状态时的版本，增量变更根据这个版本来判断是不是要适配
    chats: {}, // 所有的对话，键是对话ID
    chat: null, // 当前的对话
    visitors: [], // 所有的访客
    visitorsIndex: {}, // 访客以ID为索引
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
    }
  },
  plugins: [plugin]
});