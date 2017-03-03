<template>
    <div class="main-modes">
        <ul>
            <li>
                <router-link to="/phone/consultation">会诊</router-link>
            </li>
            <li>
                <router-link to="">转诊</router-link>
            </li>
            <li>
                <router-link to="">急救</router-link>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        created: function(){
            // console.log(this.$router);
            // let router = this.$router;
            // router.go({path:'/home/consultation'});
        }
    }
</script>

<style scoped>
    .main-modes ul{
        width: 95%;
        margin: 0 auto;
    }
    .main-modes li {
        border: 1px solid #ccc;
        border-radius: 8px;
        -webkit-border-radius: 8px;
        text-align: center;
        padding: 5px 15px;
        display: inline-block;
    }
</style>