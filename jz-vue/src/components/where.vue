<template>
    <div id="where">
        <ul class="content">
            <li @click="toPhone">
                phone
            </li>
            <li @click="toAdmin">
                后台
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        methods: {
            toPhone: function(){
                this.$router.push('/phone/list')
            },
            toAdmin: function() {
                this.$router.push('/login')
            }
        }
    }
</script>

<style type="text/css">
    #where {}
    #where .content {
        width: 65%;
        height: 36%;
        margin: -9% 0 0 -16%;
        position: absolute;
        left: 32%;
        top: 18%;
        list-style: none;
    }
    #where .content li {
        list-style: none;
        padding: 5px 0;
        margin-bottom: 10px;
        text-align: center;
        font-size: 14px;
        background-color: #fff;
        border-radius: 8px;
        -webkit-border-radius: 8px;
    }
</style>