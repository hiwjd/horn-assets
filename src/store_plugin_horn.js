export default function createHORNPlugin (HORN) {
  return store => {

    var host = window.HORN_API;//"http://app.horn.com:9092/api";
    HORN.HOST = window.HORN_API;

    HORN.StaffInfo(function(res) {
      if(res.code == 0) {
        connect(res);
      } else {
      }
    }, function(error) {
    });

    function connect(param) {
      HORN.OID = param.org.oid;

      HORN.OnRestore(function(json) {
          if(json.state.chats) {
            var chats = json.state.chats;
            for(var i=0; i<chats.length; i++) {
              //chats[i].msgs = [];
              store.dispatch('addChat', {chat: chats[i]});
            }
          }
          store.dispatch('setVersion', {version: json.state.version});
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
                        store.dispatch('addMsg', {msg: m});
                      break;
                      case "request_chat":
                        if(store.state.version == null || m.mid > store.state.version) {
                          HORN.JoinChat(m.event.chat.cid, function(j) {console.log(arguments);}, function() {console.log(arguments);});
                          m.event.chat.msgs = [];
                          store.dispatch('addChat', {chat: m.event.chat});
                        }
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
          uid: param.sid,
          role: "staff",
          tid: param.tid
      });

      HORN.StartHeartbeat(function(r) {
        console.error(r);
        return 3;
      });
    }
  }
}