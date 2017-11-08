<template>
  <section class="container">
  </section>
</template>

<script>
  //  import axios from '~/plugins/axios'

  export default {
    layout: 'main',
    async asyncData () {
    },
    head () {
      return {
        title: 'Users'
      }
    }
  }
</script>

<style scoped>

  .title
  {
    margin: 30px 0;

  }
  .users
  {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .user
  {
    margin: 10px 0;
  }
  .body{
  .container
  {
    margin: 0;
    width: 100%;
    text-align: left;
    box-sizing: border-box;
  }

  .button, .button:visited
  {
    display: inline-block;
    color: black;
    letter-spacing: 1px;
    background-color: #fff;
    border: 2px solid #000;
    text-decoration: none;
    text-transform: uppercase;
    padding: 15px 45px;
  }

  .button:hover, .button:focus
  {
    color: #fff;
    background-color: #000;
  }

  .title
  {
    color: #000;
    font-weight: 300;
    font-size: 2.5em;
    margin: 0;
  }
  .left_list >a:hover {
    text-dectoration: none;
  }
  .left {
    background: black;
    height: 800px;
  }
  .right {
    position: relative;
    height:800px;
    overflow: hidden;
    border:1px solid black;
  }
  .left_list>li>a {
    font-size: 16px;
    color:white;
  }
  .title>h3 {
    padding: 5px;
    color:white;
    font-weight: bold;
    text-align: center;
  }
  }
</style>
