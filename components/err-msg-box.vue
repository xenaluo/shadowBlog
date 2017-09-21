<template>
  <div class="err-msg-box">
    <div class="message-box">{{msg}}</div>
  </div>
</template>

<script>
  export default {
    transition: 'bounce',
    data () {
      return {
      }
    },
    props: ['msg']
  }
</script>

<style lang="" scoped>
  .err-msg-box{
    position: fixed;
    top: 200px;
    left: 35%;
    width: 30%;
    background: #5f5f5f;
    box-shadow: 0 0 10px #fff;
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
