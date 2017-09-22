<template>
  <div class="err-msg-box" v-if="getErrMsg.isShow">
    <div class="message-box">{{getErrMsg.msg}}</div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    transition: 'bounce',
    data () {
      return {
      }
    },
    props: ['msg'],
    computed: {
      ...mapGetters([
        'getErrMsg'
      ])
    }
  }
</script>

<style lang="" scoped>
  .err-msg-box{
    position: fixed;
    top: 200px;
    left: 35%;
    width: 30%;
    background: rgba(222, 68, 39, .7);
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
