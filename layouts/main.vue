<template>
    <div>
        <heade></heade>
        <nuxt/>
        <my-footer></my-footer>
    </div>

</template>
<script>
  import MyFooter from '~/components/Footer.vue'
  import Heade from '~/components/Heade.vue'

  export default {
    components: {
      MyFooter,
      Heade
    }
  }
</script>