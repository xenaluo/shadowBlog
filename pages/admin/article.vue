<template>
  <div class="">
    <div class="manage-article-list">
      <h2>文章管理</h2>
      <button class="btn btn-default"
              :class="{active: whichList}"
              :disabled="whichList"
              @click="getIssueList">已发布</button>
      <button class="btn btn-default draft"
              :class="{active: !whichList}"
              :disabled="!whichList"
              @click="getDraftList">草稿箱</button>
      <br />
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
        <tr v-if="whichList" v-for="item in showList">
          <td class="col-md-1">{{item.aid}}</td>
          <td class="col-md-1">{{item.classify}}
            <!--<span class="glyphicon glyphicon-edit" aria-hidden="true"></span>-->
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
        <tr v-if="!whichList" v-for="item in showList">
          <td class="col-md-1">{{item.aid}}</td>
          <td class="col-md-1">{{item.classify}}
            <!--<span class="glyphicon glyphicon-edit" aria-hidden="true"></span>-->
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

    <nav aria-label="Page navigation" class="ctr-page">
      <ul class="pagination">
        <li @click="prePage">
            <span class="page-index">&laquo;</span>
        </li>
        <li v-for="item in navList"
            @click="changePage(item)">
          <span class="page-index" 
                :class="{active: item === pageIndex}">{{item}}</span>
        </li>
        <li @click="nextPage">
            <span class="page-index">&raquo;</span>
        </li>
      </ul>
    </nav>

    <ErrMsgBox></ErrMsgBox>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import Tools from '~/assets/js/tools'
  import ErrMsgBox from '../../components/err-msg-box.vue'
  export default {
    async asyncData ({ params }) {
      let {data} = await axios.get(`/api/article/issue?currentPage=${1}`)
      return {
        articleList: data.issueList
      }
    },
    data () {
      return {
        whichList: false,
        draftList: [],
        navList: [],
        pageIndex: 1,
        pageSize: 10
      }
    },
    components: {
      ErrMsgBox
    },
    computed: {
      showList () {
        let skipNum = (this.pageIndex - 1) * this.pageSize
        let list = this.articleList.slice(skipNum, skipNum + 10)
        return list
      }
    },
    methods: {
      // 修改文章
      modifyArticle (itemID) {
        console.log(itemID)
        this.$router.push(`/admin/edit?id=${itemID}`)
      },
      // 删除文章
      /**
       * 点击[删除文章]按钮
       * @param itemID  待删除文章的id
       * 需要判断需要删除已发布还是草稿箱中的文章
       *  --> 从数据数组中删除当前项，促使视图渲染
       */
      deleteArticle (itemID) {
        console.log(itemID)
        axios.post(`/api/article/delete?id=${itemID}`)
          .then(response => {
            console.log(response)
            if (!response.data.status) {
              Tools.showErrorBox(this.$store, response.data.msg)
            } else {
              console.log('success delete')
              this.articleList.map((item, index) => {
                if (itemID === item.aid) {
                  console.log(item, index)
                  this.articleList.splice(index, 1)
                }
              })
            }
          })
      },
      /**
       * 索引值重置
       */
      initArticleIndex () {
        this.pageIndex = 1
        this.whichList = !this.whichList
        this.navList = []
      },
      /**
       * 获取已发布文章列表
       */
      getIssueList (index) {
        this.initArticleIndex()
        axios.get('/api/article/issue')
          .then(response => {
            console.log(response.data.count)
            this.articleList = response.data.issueList
            this.setNavList(response.data.count)
            // this.showArticleList()
          })
      },
      /**
       * 获取草稿箱文章列表
       */
      getDraftList (index) {
        this.initArticleIndex()
        axios.get(`/api/article/draft?currentPage=${index}`)
          .then(response => {
            this.articleList = response.data.draftList
            this.setNavList(response.data.count)
          })
      },
      /**
       * 当前所展示的文章列表
       */
      //      showArticleList () {
      //        let skipNum = (this.pageIndex - 1) * this.pageSize
      //        this.showList = this.articleList.slice(skipNum, skipNum + 10)
      //      },
      setNavList (count) {
        let group = Math.ceil(count / 10)
        for (let i = 0; i < group; i++) {
          this.navList.push(i + 1)
        }
        console.log(this.navList)
      },
      /**
       *  点击分页数字按钮
       *  @param index  点击的是第几页
       */
      changePage (index) {
        this.pageIndex = index
      //        this.showArticleList()
      },
      prePage () {
        if (this.pageIndex === 1) {
          Tools.showErrorBox(this.$store, '已经是第一页了')
          return
        }
        this.pageIndex = this.pageIndex - 1
      //  this.showArticleList()
      },
      nextPage () {
        if (this.pageIndex === this.navList.length) {
          Tools.showErrorBox(this.$store, '已经是最后一页了')
          return
        }
        this.pageIndex = this.pageIndex + 1
      //  this.showArticleList()
      }
    },
    created () {
      this.getIssueList()
    }
  }
</script>

<style lang="scss" scoped>
  .btn-default{
    box-shadow: none !important;
    border-radius: 0 !important;
    &.active{
      background: #ccc;
    }
    &.draft{
      border-left: none !important;
    }
  }
  .ctr-page{
    position: absolute;
    bottom: 100px;
    /*text-align: center;*/
    /*margin-top: 50px;*/
    left: 50%;
    transform:translateX(-50%);

    .page-index{
      cursor: pointer;
      color: #000 !important;
      &.active{
        background: #eee;
      }
    }
  }
</style>
