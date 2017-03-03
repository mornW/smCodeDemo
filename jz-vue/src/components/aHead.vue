<template>
    <div class="header">
        <div class="h_inner">后台页面</div>
        <div class="right-menu">
            <el-dropdown>
              <el-button >
                更多<i class="el-icon-caret-bottom el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
  export default {
    methods: {
        handleClick: function(){}
    }
  }
</script>

<style>
    .header {
        height: 55px;
        line-height: 55px;
        text-align: center;
        background-color: #35bcdc;
        color: #fff;
        font-size: 0.1rem;
        margin-bottom: 15px;
        position: relative;
    }
    .right-menu {
        position: absolute;
        right: 10px;
        top: 0px;
    }
</style>