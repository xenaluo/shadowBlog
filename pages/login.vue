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
    <ErrMsgBox :msg="errorMsg" v-if="errorShow"></ErrMsgBox>
    </div>
</template>
<script>
import ErrMsgBox from '../components/err-msg-box.vue'
import axios from '~/plugins/axios'
import sha1 from 'sha1'
import Qs from '~/plugins/qs'
export default {
  layout: 'empti',
  data: function () {
    return {
      username: '',
      psd: '',
      errorMsg: '',
      errorShow: false
    }
  },
  components: {
    ErrMsgBox
  },
  methods: {
    currentTime () {
      let currentDate = new Date()
      let year = currentDate.getFullYear()
      let month = currentDate.getMonth() + 1 < 10 ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1)
      let date = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate()
      let hours = currentDate.getHours() < 10 ? '0' + currentDate.getHours() : currentDate.getHours()
      let minutes = currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes()
      let seconds = currentDate.getSeconds() < 10 ? '0' + currentDate.getSeconds() : currentDate.getSeconds()
      return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
    },
    login (name, psd) {
      let npsd = sha1(psd)
      let time = this.currentTime()
      console.log(time)
      let message = {
        name: name,
        psd: npsd,
        time: time
      }
      // 发送账户信息
      axios.post('api/user', Qs.stringify(message)).then(response => {
        if (response.data === 0) {
          this.showErrorBox('密码错误')
        } else if (response.data === 1) {
          localStorage.setItem('name', name)
          console.log(localStorage.getItem('name'))
          this.$router.push('/edit')
          // alert('密码正确')
        } else if (response.data === 2) {
          this.showErrorBox('用户不存在')
        }
      })
    },
    showErrorBox (msg) {
      this.errorShow = true
      this.errorMsg = msg
      setTimeout(() => {
        this.errorShow = false
      }, 1000)
    }
  }
}
</script>
<style>
* {
    margin: 0;
    padding: 0
}

.loginbg {
    position: absolute;
    top: 0;
    bottom: 0;
    background: url(../assets/img/loginbg.jpg) no-repeat;
    width: 100%;
    height: 100%;
}

.connect {
    width: 300px;
    margin: 0 auto;
}

.conbg {
    position: relative;
    top: 100px;
    width: 500px;
    height: 400px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 20px;
    margin: 0 auto;
    padding: 10px 0 0 10px
}

img {
    height: 100px
}
</style>
