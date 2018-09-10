<template>
    <div class="loginbg">
        <div class="form-container">
            <div><h2></h2></div>
            <el-form :model="loginForm" status-icon :rules="rules2" ref="loginForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="name">
                    <el-input type="text" v-model="loginForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="checkPass">
                    <el-input type="password" v-model="loginForm.checkPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
       var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };
        var validateName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else {
                callback();
            }
        };
      return {
        loginForm: {
          checkPass: '',
          name : '',
          ip:''
        },
        rules2: {
            name : [
                {validator : validateName, trigger: 'blur'}
            ],
            checkPass: [
                { validator: validatePass, trigger: 'blur' }
            ],
        }
      };
    },
    mounted(){
        this.getip()
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              let userinfo = this.loginForm;
              let data = { ip:this.ip,url:'http://ip.taobao.com/service/getIpInfo.php?ip='}
              let userData = Object.assign(userinfo, data); 
              this.$axios.post('/api/user/login',userData).then((res)=>{
                if(res.data.status == 1){
                    // this.saveUserInfo() // 存入缓存，用于显示用户名
                    // this.generateMenuPushIndex() //模拟动态生成菜单并定位到index
                    // this.$store.dispatch('initLeftMenu'); //设置左边菜单始终为展开状态

                }else{
                    this.$message.error('登录失败请重试')
                }
              })
            this.$router.push('/home');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getip(){
          this.$axios.get('http://httpbin.org/ip').then(res=>{
            const ip = res.data.origin;
            this.ip = ip; 
          })
      }
    }
  }
</script>
<style>
.loginbg {
  background: url("../assets/img/bg9.jpg") no-repeat 50%;
  height: 100%;
  background-size: 100% 100%;
   padding-top: 10%
}
.form-container {
    width: 20%;
    margin: auto;
    padding: 30px;
    background: white
   
}
.el-form-item__label{
    text-align: left
}
</style>
