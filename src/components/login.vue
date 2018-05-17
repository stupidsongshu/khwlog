<template>
  <div class="login">
    <div class="group-wrapper">
        <div class="input-group mb-3">
					<div class="input-group-prepend">
							<span class="input-group-text" id="basic-addon1">用户名</span>
					</div>
					<input type="text" class="form-control" placeholder="请输入用户名" aria-label="Username" aria-describedby="basic-addon1"
					v-model="userName" ref="userName" @input="inputUserName" :class="{'invalid-input': userNameError}" autofocus>
        </div>
        <div class="hint-error" v-show="userNameError">用户名不能为空</div>

        <div class="input-group mb-3">
					<div class="input-group-prepend">
							<span class="input-group-text" id="basic-addon1">密码</span>
					</div>
					<input type="text" class="form-control" placeholder="请输入密码" aria-label="Username" aria-describedby="basic-addon1"
					v-model="userPsw" ref="userPsw" @input="inputUserPsw" :class="{'invalid-input': userPswError}">
        </div>
				<div class="hint-error" v-show="userPswError">密码不能为空</div>

        <button type="submit" class="btn btn-default" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      userPsw: "",
      userNameError: false,
      userPswError: false
    };
  },
  methods: {
    login() {
      if (this.userName.trim() === "") {
				this.userNameError = true;
				this.$refs.userName.focus();
        return;
      } else if (this.userPsw.trim() === "") {
				this.userPswError = true;
				this.$refs.userPsw.focus();
        return;
			}
			let call = 'Report.login'
			let timestamp = new Date().getTime()
			let sign = this.getSign(call, timestamp)
			let paramString = JSON.stringify({
				ua: 'KHW_H5_SIGN',
				call: call,
				args: {
					account: this.userName,
					password: this.userPsw
				},
				sign: sign,
				timestamp: timestamp
			})
			this.axios.post('http://47.100.136.167:8080/khw/r/i', paramString).then(res => {
				let data = res.data
				if (data.returnCode === '000000') {
					window.sessionStorage.account = data.response.account
					window.sessionStorage.token = data.response.token
					this.$router.push('/')
				} else {
					alert(data.returnMsg)
				}
			}).catch(err => {
				console.log(err)
				alert('连接失败，请稍后重试！')
			})
		},
		inputUserName() {
			if (this.userName.trim() !== "") {
				this.userNameError = false;
			}
		},
		inputUserPsw() {
			if (this.userPsw.trim() !== "") {
				this.userPswError = false;
			}
		}
  }
};
</script>

<style>
.login {
  width: 100%;
  height: 100%;
}
.login .group-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 200px;
}
.hint-error {
	margin-bottom: 1rem;
	font-size: 14px;
	color: red;
}
.invalid-input {
	box-shadow: 0 0 2px red;
}
</style>
