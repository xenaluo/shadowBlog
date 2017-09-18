<template>
  <div>

    <section class = "row body">

      <section class = "left col-md-2">
        <section class = "title">
          <h3>shadowBlog</h3>
          <ul class = "left_list">
            <li><a href="#">用户信息</a></li>
            <li><a href="#">发布文章</a></li>
            <li><a href="#">文章管理</a></li>
            <li><a href="#">分类管理</a></li>
            <li><a href="#">站点管理</a></li>
          </ul>
        </section>
      </section>
      <section class = "right col-md-10" >
        <nuxt/>
      </section>

    </section>

    <my-footer/>
  </div>
</template>

<script>
import MyFooter from '~/components/Footer.vue'

export default {
  components: {
    MyFooter
  }
}
</script>

<style>
.container
{
  margin: 0;
  width: 100%;
  text-align: left;
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
  height:500px;
  border:1px sold black;
}
.left_list>li>a {
  font-size: 16px;
  color:white;
}
  h3 {
    padding: 5px;
    color:white;
    font-weight: blod;
    text-align: center;
  }

</style>
