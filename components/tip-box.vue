<template>
  <div class="err-msg-box" v-if="mm.state">
    <div class="message-box">{{mm.msg}}</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isShow: true
      }
    },
    props: ['msg', 'state', 'mm'],
    computed: {
    }
  }
</script>

<style lang="" scoped>
  .err-msg-box{
    position: fixed;
    top: 200px;
    left: 35%;
    width: 30%;
    background: rgba(164, 222, 50, 0.7);
    box-shadow: 0 0 3px #fff;
    color: #fff;
    font-size: 18px;
    text-align: center;
    line-height: 38px;
    z-index: 30;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>
