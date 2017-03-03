<template>
    <div class="login">
        <div class="lbody">
            <el-row :gutter="20" class="what">
                <el-col :span="18" :offset="3">
                    <!-- <div class="grid-content bg-purple"></div> -->
                    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                      <el-form-item label="用户名" prop="name">
                        <el-input v-model.number="ruleForm2.name"></el-input>
                      </el-form-item>
                      <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                      </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            var checkName = function (rule, value, callback){
                if (!value) {
                  return callback(new Error('用户名不能为空'));
                }
            };
            var validatePass = function(rule, value, callback){
                if (value === '') {
                  callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                  pass: '',
                  name: ''
                },
                rules2: {
                  pass: [
                    { validator: validatePass, trigger: 'blur' }
                  ],
                  name: [
                    { validator: checkName, trigger: 'blur' }
                  ]
                }
            };
        },
        methods: {
          submitForm(formName) {
            this.$router.push('/adminIndex/users');
            // this.$refs[formName].validate(function (result) {
            //     if(result){
            //         console.log('submit!');
            //     }else{
            //         alert("表达验证不合法")
            //     }
            // })
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          }
        }
      }
</script>

<style>
    .el-row {
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .login {
        background-color: #35bcdc;
        color: #fff;
        min-height: 100%;
    }
    .lbody {
        position: relative;
        padding-top: 25%;
    }
    .what {
        /*position: absolute;*/
        /*height: 30%;*/
        /*border: 1px solid;*/
        /*top: 50%;*/
        /*left: 50%;*/
        /*margin: -25% 0 0 -25%!important;*/
    }
</style>