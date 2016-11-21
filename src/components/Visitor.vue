<template>
    <div>
        Visitor
        <div>
            <ul>
                <li v-for="user in users">{{user.uid}} {{user.os}} {{user.browser}} <a target="_blank" :href="user.url">{{user.title}}</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        created () {
            var _self = this;
            function fetch() {
                HORN.GetOnlineUserList(function(r) {
                    for(var i=0; i<r.data.length; i++) {
                        _self.$store.dispatch("addUser", {user: r.data[i]});
                    }
                }, function(err) {
                    alert(err);
                });
            }

            fetch();

            setInterval(fetch, 5000);
        },
        computed: {
            users() {
                return this.$store.state.users;
            }
        }
    }
</script>