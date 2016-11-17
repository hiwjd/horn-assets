export default function createHORNPlugin (HORN) {
  return store => {

    var host = window.HORN_API;//"http://app.horn.com:9092/api";

    HORN.HOST = window.HORN_API;
    HORN.CID = "0DWOanOQ9IqkOd3";

    var content = $("#content"),
        msg = $("#msg"),
        nick = $("#nick").val(),
        conn_type = $("#conn_type").val(),
        version = "",
        paramUID = "";//store.state.route.params.uid;

    HORN.StaffInfo(function(res) {
      if(res.code == 0) {
        connect(paramUID, res);
      } else {
        // _self.$message({
        //   message: "状态异常，您可以尝试重新登录",
        //   type: "error"
        // });
      }
    }, function(error) {
      // _self.$message({
      //   message: "状态异常，您可以尝试重新登录",
      //   type: "error"
      // });
    });

    function connect(paramUID, param) {
      HORN.CID = "0DWOanOQ9IqkOd3";

      HORN.OnRestore(function(json) {
        debugger;
          console.log(json);
          if(json.state.chats) {
            var chats = json.state.chats;
            for(var i=0; i<chats.length; i++) {
              chats[i].msgs = [];
              //_self.users[chats[i].id] = chats[i];
              //Vue.set(store.state.chats, chats[i].id, chats[i]);
              store.dispatch('addChat', {chat: chats[i]});
            }
          }
          //store.dispatch('updateVersion', {chat: chats[i]});
          //version = json.state.version;

        // if(!paramUID) {
        //   if(Object.keys(store.state.chats).length > 0) {
        //     console.log("默认选第一个");
        //     var _uid = Object.keys(store.state.chats)[0];
        //     store.state.route.push({ name: "chatcard", params: {uid: _uid} });
        //   } else {
        //     console.log("跳转到nochat");
        //     store.state.route.push({ name: "nochat" });
        //   }
        // } else {
        //   console.log("找对话");
        //   if(typeof store.state.chats[paramUID] == "object") {
        //     //this.curUser = _self.users[this.$route.params.uid];
        //     store.state.route.push({ name: "chatcard", params: {uid: paramUID} });
        //   } else {
        //     store.state.route.push({ name: "nochat" });
        //   }
        // }
      });

      HORN.OnMessage(function(json) {
          console.log(json);
          if(json.data) {
              for(var i=0; i<json.data.length; i++) {
                  var m = json.data[i];
                  switch(m.type) {
                      case "text":
                      case "image":
                      case "file":
                        //store.state.route[m.chat.id].msgs.push(m);
                        store.dispatch('addMsg', {msg: m});
                      break;
                      case "request_chat":
                        if(version == null || m.mid > version) {
                          HORN.JoinChat(m.event.chat.id, function(j) {console.log(arguments);}, function() {console.log(arguments);});
                        }
                        //Vue.set(_self.users, m.event.chat.id, {id:m.event.chat.id, msgs:[]});
                        //_self.users[m.event.chat.id].msgs.push(m);
                        m.event.chat.msgs = [];
                        store.dispatch('addChat', {chat: m.event.chat});
                      break;
                      case "join_chat":
                      break;
                  }
              }
          }
      });

      HORN.OnError(function(e) {
          console.log("onerror");
      });

      HORN.Init({
          uid: param.staff_id,
          conn_type: "longpolling",
          role: "staff",
          track_id: param.track_id
      });

      HORN.StartHeartbeat(function(r) {
        console.error(r);
        return 3;
      });
    }

    // socket.on('data', data => {
    //   store.commit('receiveData', data)
    // })
    // store.subscribe(mutation => {
    //   if (mutation.type === 'UPDATE_DATA') {
    //     socket.emit('update', mutation.payload)
    //   }
    // })
  }
}