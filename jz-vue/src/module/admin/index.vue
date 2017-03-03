<template>
    <div class="admin-index">
        <!-- 头部 -->
        <ad-header class="clearfix"></ad-header>
        <!-- 主体 -->
        <div class="admin-body">
            <!-- 左边导航 -->
            <div class="navs">
                <el-row class="tac">
                    <el-col :span="24">
                        <el-menu v-for="(na,index) in navList" default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                            <el-submenu index="index" v-if="na.pid == 0">
                                <template slot="title"><i class="el-icon-message"></i>{{na.description}}</template>
                                <el-menu-item-group v-for="(sub,ind) in navSub" v-if="sub.pid == na.id">
                                    <!-- <template slot="title">{{sub.description}}</template> -->
                                    <el-menu-item index="index-ind">{{sub.description}}</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                </el-row>
                <div class="toggle-menu" @click='toggleMenu'>
                    <i class='el-icon-arrow-left'></i>
                </div>
            </div>
            <!-- 右边内容 -->
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import header from '../../components/aHead'
//展开菜单
// export const SET_MENU_OPEN = 'SET_MENU_OPEN';
//关闭菜单
// export const SET_MENU_CLOSE = 'SET_MENU_CLOSE';
import nd from '../../assets/jsons/allNav.json'

export default {
    data() {
        return {
            navList: [],
            navParent: [],
            navSub: []
        }
    },
    created: function(){
        this.navData();
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        navData(){
            var self = this;
            self.navList = nd;
            for(var i=0; i<nd.length; i++){
                // console.log(nd[i]);
                if(nd[i].pid == 0){
                    self.navParent.push(nd[i]);
                } else {
                    self.navSub.push(nd[i]);
                }
            }
        },
        winSize(){
            // console.log('size');
        },
        toggleMenu(){
            // this.$store.dispatch(this.$store.state.leftmenu.menu_flag?'set_menu_close':'set_menu_open');
        }
    },
    components: {
        'ad-header': header,
    }
}
</script>

<style>
    .navs {
        width: 200px;
        position: fixed;
        left: 0;
        top: 55px;
    }
    .el-menu-item-group__title {
        padding-top: 0;
    }
</style>