<template>
  <div class="edit-article">
    <span class="change-editor" @click="showEditor">{{changeEditor}}</span>
    <form action="">
      <div class="form-group">
        <input type="text" class="form-control"
               placeholder="文章标题"
               v-model="title">
      </div>
      <div class="form-group">
        <!--<label for="exampleInputName2">Name</label>-->
        <input type="text" class="form-control" id="authorInput" placeholder="作者" v-model="author">
      </div>
      <div id="edit">
        <VmMarkdown v-if="!editor"
                    width="100%"
                    height="500px"
                    :markdStr="md"
                    :htmlStr="content"
                    v-on:gethtml="showHtml"
                    class="markdown">
        </VmMarkdown>
        <EditQuill v-else></EditQuill>
      </div>
      <div class="row form-inline">
        <div class="col-md-6">
          <div class="col-md-6" style="padding-left: 0">
            <input type="text"
                   class="form-control input-sm"
                   placeholder="多个标签以英文逗号分隔"
                   style="margin-right: 10px; width: 100%"
                   v-model="tag">
          </div>
          <div class="form-group">
            <label for="selectCar">文章分类</label>
            <select class="form-control input-sm" id="selectCar" style="margin-left: 10px" v-model="selected">
              <option value="默认分类">默认分类</option>
              <option v-for="item in classifyList" :value="item.name">{{item.name}}</option>
            </select>
          </div>
        </div>
        <div class="col-md-6 form-inline" style="text-align: right">
          <label class="checkbox-inline">
            <input type="checkbox" id="inlineCheckbox1" value="option1" @click="handleTop" :checked="isTop"> 置顶
          </label>
          <label class="checkbox-inline">
            <input type="checkbox" id="inlineCheckbox2" value="option1" @click="handleComment" :checked="canComment"> 允许评论
          </label>
          <input class="btn btn-default"
                 type="button" value="存草稿"
                 style="margin-left: 10px"
                 @click="commitArticle(0)">
          <input class="btn btn-default"
                 type="button"
                 value="发布"
                 style="margin-left: 10px; background-color: #dedede"
                 @click="commitArticle(1)">
        </div>
      </div>
    </form>
    <ErrMsgBox></ErrMsgBox>
  </div>
</template>

<script>
  import VmMarkdown from '../../components/edit/vm-markdown.vue'
  import EditQuill from '../../components/edit/edit-quill.vue'
  import ErrMsgBox from '../../components/err-msg-box.vue'
  import Tools from '~/assets/js/tools'
  import axios from '~/plugins/axios'
  import Qs from '~/plugins/qs'
  export default {
    async asyncData ({ params, query, router }) {
      console.log('params', params)
      console.log('query', query)
      let {data} = await axios.get(`/api/article?aid=${query.id}`)
      console.log('tag', data.article)
      return {
        tag: data.article ? data.article.label.join(',') : '',
        title: data.article ? data.article.title : '',
        author: data.article ? data.article.author : '',
        content: data.article ? data.article.content : '',
        md: data.article ? data.article.md_str : '',
        classifyList: data.classify
      }
    },
    name: 'edit',
    components: {
      VmMarkdown,
      EditQuill,
      ErrMsgBox
    },
    data: function () {
      return {
        editor: 0,
        tag: '',
        selected: '默认分类',
        isTop: false,
        canComment: true,
        md: ''
      }
    },
    created () {
      console.log(this.$route)
    },
    methods: {
      /**
       * 监听子组件的回调函数
       * @param html html部分str
       * @param md markdown编辑器部分str
       */
      showHtml (html, md) {
        this.content = html
        this.md = md
      },
      /**
       * 切换富文本编辑器和markdown编辑器
       */
      showEditor () {
        this.editor = !this.editor
      },
      /**
       * 是否置顶
       */
      handleTop () {
        this.isTop = !this.isTop
      },
      /**
       * 是否允许评论
       */
      handleComment () {
        this.canComment = !this.canComment
      },
      /**
       * 点击[存草稿]/[发布文章]
       * @param code  0:存草稿  1：发布文章
       */
      commitArticle (code) {
        let sendData = {
          id: this.$route.query.id,
          title: this.title,
          author: this.author,
          state: code,
          current_name: localStorage.getItem('name') || 'admin1',
          publish_time: Tools.currentTime(),
          images: '',
          classify: this.selected,
          md_str: this.md,
          content: this.content,
          label: this.tag,
          is_top: this.isTop,
          can_comment: this.canComment
        }
        if (!this.title) {
          Tools.showErrorBox(this.$store, '文章标题不能为空')
          return
        } else if (!this.author) {
          Tools.showErrorBox(this.$store, '作者不能为空')
          return
        } else if (!this.content) {
          Tools.showErrorBox(this.$store, '文章内容不能为空')
          return
        }
        axios.post('/api/article/add', Qs.stringify(sendData))
          .then(response => {
            console.log(response.data)
            if (response.data.status) {
              this.$router.push('/admin/article')
            }
          })
      }
    },
    computed: {
      // 切换富文本编辑器和markdown编辑器
      changeEditor () {
        if (this.editor) {
          return 'M'
        } else {
          return 'E'
        }
      }
      // TODO: 字数行数检测
    }
  }
</script>

<style lang="scss">
  #edit {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .article-tag{
    text-decoration: underline;
    margin-left: 6px;
    color: #1d3e81 !important;
  }
  .right{
    position: relative;
  }
  .edit-article{
    /*position: relative;*/
    width: 94%;
    margin: 50px auto;
  }
  .show-editor{
    position: absolute;
    width: 30px;
    text-align: center;
    top: 200px;
    left: 0;
  }
  .change-editor{
    cursor: pointer;
    display: block;
    position: absolute;
    width: 55px;
    height: 30px;
    line-height: 30px;
    top: 200px;
    left: -20px;
    padding-left: 24px;
    border: 1px solid #7f828b;
    border-right: 0;
    transition: all .3s;
    z-index: 10;
    &:hover{
      left: -1px;
      padding-left: 5px;
    }
    &:after{
      position: absolute;
      right: -10px;
      top: 4px;
      display: block;
      content: '';
      width: 20px;
      height: 20px;
      border-left: 1px solid #7f828b;
      border-bottom: 1px solid #7f828b;
      transform: rotateZ(45deg);
    }
  }
</style>

