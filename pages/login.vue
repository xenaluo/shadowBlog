<template>
  <div class="loginbg">
    <!--<div class="conbg">-->
      <img src="../assets/img/logo2.jpeg">
      <form class="connect">
        <div class="form-group">
          <!--<label>用户名</label>-->
          <input type="email"
                 class="form-control"
                 placeholder="管理员"
                 v-model="username">
        </div>
        <div class="form-group">
          <!--<label>密码</label>-->
          <input type="password"
                 class="form-control"
                 placeholder="密码"
                 v-model="psd">
        </div>
        <button type="button"
                class="btn btn-default btn-block"
                @click="login(username, psd)">
          登录</button>
      </form>
    <!--</div>-->
    <ErrMsgBox></ErrMsgBox>
    </div>
</template>
<script>
import ErrMsgBox from '../components/err-msg-box.vue'
import Tools from '~/assets/js/tools'
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
  components: {
    ErrMsgBox
  },
  methods: {
    login (name, psd) {
      let npsd = sha1(psd)
      let time = Tools.currentTime()
      console.log(time)
      let message = {
        name: name,
        psd: npsd,
        time: time
      }
      // 发送账户信息
      axios.post('/api/login', Qs.stringify(message)).then(response => {
        if (response.data === 0) {
          Tools.showErrorBox(this.$store, '密码错误')
        } else if (response.data === 2) {
          Tools.showErrorBox(this.$store, '用户不存在')
        } else {
          // console.log(response.data)
          let token = response.data.token
          localStorage.setItem('token', token)
          console.log('88' + localStorage.getItem('token'))
          this.$router.replace('/admin/edit')
          // let token = localStorage.getItem('token')
        }
        // if (response.data === 1) {
        //   localStorage.setItem('name', name)
        //   console.log(localStorage.getItem('name'))
        //   this.$router.push('/admin/edit')
        // } 
      })
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
    /*background: url(../assets/img/loginbg.jpg) no-repeat;*/
    background: #000;
    width: 100%;
    height: 100%;
    text-align: center;
    padding-top: 150px;
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
.form-group{
  margin-bottom: 20px;
}
img {
    height: 100px
}
</style>
