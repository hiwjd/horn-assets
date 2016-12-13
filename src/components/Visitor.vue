<template>
    <div>
        Visitor
        <div>
            <ul>
                <li v-for="visitor in visitors">{{visitor.vid}} {{visitor.os}} {{visitor.browser}} <a target="_blank" :href="visitor.url">{{visitor.title}}</a></li>
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
                        _self.$store.dispatch("addVisitor", {visitor: r.data[i]});
                    }
                }, function(err) {
                    alert(err);
                });
            }

            fetch();

            setInterval(fetch, 5000);
        },
        computed: {
            visitors() {
                return this.$store.state.visitors;
            }
        }
    }
</script>