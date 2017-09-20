<template>
    <div class="header">
        <img v-bind:src="imgUrl" alt="logo" class="logo"/>
        <p class="">{{ message }}</p>
    </div>
</template>
<script>
import axios from '~/plugins/axios'
export default {
    async asyncData() {
        let { data } = await axios.get('api')
        return { message: data.message }
        return { imgUrl: data.url }
    },
    data: function() {
        return {
            imgUrl: '',
            message: ''
        }
    }
}
</script>
<style>
.header{
    width: 100%;
    height: 200px;
}
</style>

