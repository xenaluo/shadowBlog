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
        <tr>
          <td class="col-md-1">ID</td>
          <td class="col-md-1">分类
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
          </td>
          <td class="col-md-1">作者</td>
          <td class="col-md-3">标题</td>
          <td class="col-md-2">日期</td>
          <td class="col-md-1">评论</td>
          <td class="col-md-1">状态</td>
          <td class="col-md-1">
            <button type="button"
                    class="btn btn-primary btn-xs"
                    @click="showUpdateclass(item)">
              修改</button>
            &nbsp;&nbsp;
            <button type="button"
                    class="btn btn-danger btn-xs"
                    @click="showDeleteClass(item)">
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
  export default {
    data () {
      return {}
    }
  }
</script>

<style lang="" scoped>

</style>
