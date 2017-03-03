<template>
    <div class="con-modes">
        <ul>
            <li>
                <router-link to="/phone/consultation/1">添加</router-link>
            </li>
            <li>
                <router-link to="/phone/consultation/2">列表</router-link>
            </li>
            <li>
                <router-link to="/phone/consultation/3">用户信息</router-link>
            </li>
            <li>
                <router-link to="/phone/consultation/4">流转进度</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped>
    .con-modes ul{
        width: 95%;
        margin: 0 auto;
    }
    .con-modes li {
        border: 1px solid blue;
        border-radius: 8px;
        -webkit-border-radius: 8px;
        text-align: center;
        padding: 5px 15px;
        display: inline-block;
    }
</style>