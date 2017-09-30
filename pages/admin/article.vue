<template>
  <div class="">
    <div class="manage-article-list">
      <h2>文章管理</h2>
      <button class="btn btn-default"
              @click="">添加分类</button>
      <table class="table table-hover">
        <thead>
        <tr>
          <td>ID</td>
          <td>分类</td>
          <td>作者</td>
          <td>标题</td>
          <td>日期</td>
          <td>评论</td>
          <td>状态</td>
          <td>操作</td>
          <td></td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in issueList">
          <td class="col-md-1">{{item.aid}}</td>
          <td class="col-md-1">{{item.classify}}
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
          </td>
          <td class="col-md-1">{{item.author}}</td>
          <td class="col-md-3">{{item.title}}</td>
          <td class="col-md-2">{{item.publish_time}}</td>
          <td class="col-md-1">0</td>
          <td class="col-md-1">{{item.is_top?'置顶':''}}</td>
          <td class="col-md-2">
            <button type="button"
                    class="btn btn-primary btn-xs"
                    @click="modifyArticle(item.aid)">
              修改</button>
            &nbsp;&nbsp;
            <button type="button"
                    class="btn btn-danger btn-xs"
                    @click="deleteArticle(item.aid)">
              删除</button>
          </td>
          <td class="col-md-1"></td>
        </tr>
        </tbody>
      </table>
    </div>

    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li>
          <a href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li><a href="#">1</a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">4</a></li>
        <li><a href="#">5</a></li>
        <li>
          <a href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  export default {
    async asyncData ({ params }) {
      let {data} = await axios.get(`/api/article/issue?currentPage=${1}`)
      console.log('data', data.length)
      data.map(item => {
        console.log(item.is_top)
      })
      return { issueList: data }
    },
    data () {
      return {}
    },
    computed: {
    },
    methods: {
      modifyArticle (itemID) {
        console.log(itemID)
        this.$router.push(`/admin/edit?id=${itemID}`)
      },
      deleteArticle (item) {
        console.log(item)
      }
    }
  }
</script>

<style lang="" scoped>

</style>
