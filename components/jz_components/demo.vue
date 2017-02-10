<template>
    <div id="dcontent">{{cdTxt}}</div>
</template>

<script>
    export default {
        data() {
            return {
                cdTxt: 'hi hi~~~'
            }
        },
        methods: {
            showMsg: function(){
                alert(124);
            }
        }
    }
</script>

<style scoped>
    #dcontent {
        border: 1px solid #ccc;
        width: 50%;
        margin: 15px auto;
        text-align: center;
        font-size: 15px;
        color: blue;
    }
</style>