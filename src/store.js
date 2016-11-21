import Vue from 'vue'
import Vuex from 'vuex'
import createHORNPlugin from './store_plugin_horn.js'

Vue.use(Vuex)

const plugin = createHORNPlugin(HORN)

export default new Vuex.Store({
  state: {
    version: "", // 全量同步状态时的版本，增量变更根据这个版本来判断是不是要适配
    chats: {}, // 所有的对话，键是对话ID
    chat: null, // 当前的对话
    users: {}, // 所有的访客
  },
  mutations: {
    addChat (state, payload) {
        //if(payload.chat.mid > state.version) {
            Vue.set(state.chats, payload.chat.id, payload.chat);
        //}
    },
    addMsg (state, payload) {
        var msg = payload.msg,
            chat = state.chats[msg.chat.id];

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
    addUser (state, payload) {
        Vue.set(state.users, payload.user.uid, payload.user);
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
    addUser (context, payload) {
        context.commit('addUser', payload);
    }
  },
  plugins: [plugin]
});