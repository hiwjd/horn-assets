import Vue from 'vue'
import Vuex from 'vuex'
import createHORNPlugin from './store_plugin_horn.js'

Vue.use(Vuex)

const plugin = createHORNPlugin(HORN)

export default new Vuex.Store({
  state: {
    count: 0,
    version: "",
    chats: {},
    chat: null
  },
  mutations: {
    increment (state) {
      state.count++
    },
    addChat (state, payload) {
        Vue.set(state.chats, payload.chat.id, payload.chat);
    },
    addMsg (state, payload) {
        var msg = payload.msg,
            chat = state.chats[msg.chat.id];
        chat.msgs.push(msg);
    },
    choseChat (state, payload) {
        state.chat = payload.chat;
    }
  },
  actions: {
    increment (context) {
        context.commit('increment');
    },
    addChat (context, payload) {
        context.commit('addChat', payload);
    },
    addMsg (context, payload) {
        context.commit('addMsg', payload);
    },
    choseChat (context, payload) {
        context.commit('choseChat', payload);
    }
  },
  plugins: [plugin]
});