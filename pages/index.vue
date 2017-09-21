<template>
  <section class="container">
    <h1>test</h1>
  </section>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    layout: 'main',
    async asyncData () {
      let { data } = await axios.get('/api/users')
      console.log('data', data)
      return { users: data }
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
</style>
