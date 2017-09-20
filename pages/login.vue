<template>
    <div class="loginbg">
		<div class="conbg">	
			<img src="../assets/img/logo3.png">
        <form class="connect">
            <div class="form-group">
                <label>用户名</label>
                <input type="email" class="form-control" placeholder="Username" v-model="username">
            </div>
            <div class="form-group">
                <label>密码</label>
                <input type="password" class="form-control" placeholder="Password" v-model="psd">
            </div>
            <button type="button" class="btn btn-success" @click="login(username, psd)">登录</button>
        </form>
        </div>
    </div>
</template>
<script>
import axios from '~/plugins/axios'
import sha1 from 'sha1'
import Qs from '~/plugins/qs'
export default {
  layout: 'empti',
  data: function () {
    return {
      username: '',
      psd: ''
    }
  },
  methods: {
    login (name, psd) {
      let npsd = sha1(psd)
      // 发送账户信息
      axios.post('api/classify1', Qs.stringify([{name: name}, {psd: npsd}]))
    }
  }
}
</script>
<style>
	*{
		margin: 0;
		padding: 0
	}
.loginbg{
	position: absolute;
    top: 0;
    bottom: 0;
    background: url(../assets/img/loginbg.jpg) no-repeat;
    width: 100%;
    height: 100%;
}
.connect{
    width: 300px;
    margin: 0 auto;

}
.conbg{
	position: relative;
	top: 100px;
	width: 500px;
	height: 400px;
	background-color: rgba(255,255,255,0.4);
	border-radius: 20px; 
	margin: 0 auto;
	padding: 10px 0 0 10px

}
img{
	height: 100px
}
</style>
