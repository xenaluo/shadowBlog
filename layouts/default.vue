<template>
  <div>

    <section class = "row body">

      <section class = "left col-md-2">
        <section class = "title">
          <h3>shadowBlog</h3>
          <ul class = "left_list">
            <li><nuxt-link to="">用户信息</nuxt-link></li>
            <li><nuxt-link to="/edit">发布文章</nuxt-link></li>
            <li><nuxt-link to="/article">文章管理</nuxt-link></li>
            <li><nuxt-link to="/classified">分类管理</nuxt-link></li>
            <li><nuxt-link to="/web">站点管理</nuxt-link></li>
          </ul>
        </section>
      </section>
      <section class = "right col-md-10">
        <nuxt/>
      </section>

    </section>


  </div>
</template>

<script>

import axios from '~/plugins/axios'
export default {
  async asyncData () {
    let { data } = await axios.get('/api/classify')
    console.log('data', data)
    return { items: data }
  }
}
</script>

<style>
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

</style>
