<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>通用后台操作系统</span>
      </div>
      <el-form
        labbel-width="80px"
        :model="form"
        status-icon :rules="rules"
        ref="form"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
        <!--校验方式一-->
        <!--:rules="[
            {require: true, message: '请输入用户名', trigger: 'blur'},
            {min: 4, max: 10, message: '长度在4-10位字符之间', trigger: 'blur'}
        ]"-->
          <el-input type="username" v-model="form.username" ></el-input>
        </el-form-item>
      <el-form-item label="密码" prop="password">
       <!--校验方式一-->
       <!--:rules="[
         {require: true, message: '请输入密码', trigger: 'blur'},
         {min: 6, max: 12, message: '长度在6-12位字符之间', trigger: 'blur'}
        ]"-->
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="login('form')">登录</el-button>
      </el-form-item>
    </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    const validateName = (rule, value, callback) => {
      // 请输入4-10位用户名
      let reg = /(^[a-zA-Z0-9]{4,10}$)/
      if(value === '') {
        callback(new Error('请输入用户名'))
      } else if (reg.test(value)) {
        callback(new Error('请输入4-10位用户名'))
      } else {
        callback()
      }
    };
    const validatePass = (rule, value, callback) => {
      // 6-12位密码需要包含大小写字母盒数字以及特殊符号
      let pass = /^\S*(?=\S{6,12})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*?])\S*$/
      if(value === "") {
        callback(new Error('请输入密码'))
      } else if (pass.test(value)) {
        callback(new Error('6-12位密码需要包含大小写字母盒数字以及特殊符号'))
      } else {
        callback()
      }
    };
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{validator: validateName, trigger: 'blur'}],
        password: [{validator: validatePass, trigger: 'blur'}]
      }
    }
  },
  methods: {
    login(form) {
      this.$refs[form].validate((valid) => {
        if(valid){
          console.log(this.form)
          this.axios.post('https://rapserver.sunmi.com/app/mock/304/login', this.form)
          .then(res => {
            console.log(res)
            if(res.data.status === 200){
              localStorage.setItem('username', res.data.username)
              this.$message({message: res.data.message, type: 'success'})
              this.$router.push('/home')
            }
          })
          .catch(err => {
            console.error(err)
          })
        } else {
          console.error(this.form)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.login {
  width: 100%;
  heigth: 100%;
  position: absolute;
  background: #409EFF;
  .box-card {
    width: 450px;
    margin: 200px auto;
    .el-card__header {
      font-size: 34px;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>