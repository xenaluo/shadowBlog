<template>
  <div class="edit-article">
    <span class="change-editor" @click="showEditor">{{changeEditor}}</span>
    <form action="">
      <div class="form-group">
        <input type="text" class="form-control" id="titleInput" placeholder="Title" v-model="title">
      </div>
      <div class="form-group">
        <!--<label for="exampleInputName2">Name</label>-->
        <input type="text" class="form-control" id="authorInput" placeholder="Author" v-model="author">
      </div>
      <div id="edit">
        <VmMarkdown v-if="!editor"
                    width="100%"
                    height="500px"
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
              <option v-for="item in getClassifyList" :value="item.name">{{item.name}}</option>
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
    <ErrMsgBox :msg="errorMsg" v-if="errorShow"></ErrMsgBox>
  </div>
</template>

<script>
  import VmMarkdown from '../components/edit/vm-markdown.vue'
  import EditQuill from '../components/edit/edit-quill.vue'
  import ErrMsgBox from '../components/err-msg-box.vue'
  import Tools from '~/assets/js/tools'
  import axios from '~/plugins/axios'
  import Qs from '~/plugins/qs'
  import { mapGetters } from 'vuex'
  export default {
    async fetch ({ store, params }) {
      let { data } = await axios.get('/api/classify')
      store.dispatch('classify/initClassifyList', data)
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
        title: '',
        author: '',
        tag: '',
        content: '',
        selected: '默认分类',
        isTop: false,
        canComment: true,
        errorMsg: 'error',
        errorShow: false
      }
    },
    methods: {
      showHtml (html) {
        this.content = html
      },
      showEditor () {
        this.editor = !this.editor
      },
      selectTheme (evt) {
        if (evt.target.tagName === 'SPAN') {
          let theme = evt.target.dataset.theme
          let themeType = document.querySelector('.theme-type')
          let spans = evt.target.parentNode.querySelectorAll('span')
          spans.forEach(elem => {
            elem.style = ''
          })
          this.theme = theme
          themeType.innerText = theme
          evt.target.style.width = '28px'
          evt.target.style.height = '28px'
        }
      },
      handleTop () {
        this.isTop = !this.isTop
      },
      handleComment () {
        this.canComment = !this.canComment
      },
      commitArticle (code) {
        let sendData = {
          title: this.title,
          author: this.author,
          state: code,
          current_name: localStorage.getItem('name') || 'admin1',
          publish_time: Tools.currentTime(),
          images: '',
          classify: this.selected,
          content: this.content,
          label: this.tag,
          is_top: this.isTop,
          can_comment: this.canComment
        }
        if (!this.title) {
          this.showErrorBox('文章标题不能为空')
          return
        } else if (!this.author) {
          this.showErrorBox('作者不能为空')
          return
        } else if (!this.content) {
          this.showErrorBox('文章内容不能为空')
          return
        }
        axios.post('/api/article/add', Qs.stringify(sendData))
          .then(response => {
            console.log(response.data)
            if (response.data.status) {
              this.$router.push('/classified')
            }
          })
      },
      showErrorBox (msg) {
        this.errorShow = true
        this.errorMsg = msg
        setTimeout(() => {
          this.errorShow = false
        }, 1000)
      }
    },
    computed: {
      ...mapGetters('classify', [
        'getClassifyList'
      ]),
      changeEditor () {
        if (this.editor) {
          return 'M'
        } else {
          return 'E'
        }
      }
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

