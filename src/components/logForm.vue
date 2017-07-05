<template>
  <div class="login-form"> 
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名: </span>
        <div class="g-form-input">
          <input type="text" v-model="usernameModel" placeholder="请输入您的用户名">  
        </div>
        <span class="g-form-error"> {{ userErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码: </span>
        <div class="g-form-input">
            <input type="password" v-model="passwordModel" placeholder="请输入您的密码">
        </div>
        <span class="g-form-error"> {{ passwordErrors.errorText }} </span>  
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onLogin">登录</a>
        </div>  
      </div>
      <p> {{ errorText }} </p>    
    </div>    
  </div>
</template>

<script>
export default {
  data () {
    return {
      usernameModel: '',
      passwordModel: '',
      errorText: ''
    }
  },
  computed: {
    userErrors () {
      let errorText, status
      if (!/@/g.test(this.usernameModel)) {
        status = false
        errorText = '不包含@'
      } else {
        status = true
        errorText = ''
      }
      if (!this.userFlag) {
        errorText = ''
        this.userFlag = true
      }
      return {
        status,
        errorText
      }
    },
    passwordErrors () {
      let errorText, status
      if (!/^\w{1,8}$/g.test(this.passwordModel)) {
        status = false
        errorText = '密码不是1-8位'
      } else {
        status = true
        errorText = ''
        console.log('loging')
      }
      if (!this.passwordFlag) {
        errorText = ''
        this.passwordFlag = true
      }
      return {
        status,
        errorText
      }
    }
  },
  methods: {
    onLogin () {
      if (!this.userErrors.status || !this.passwordErrors.status) {
        this.errorText = '输入信息某部分有误，请重新输入'
      } else {
        this.errorText = ''
        this.$http.get('api/login').then((res) => {
          this.$emit('has-log', res.data)
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
}
</script>
