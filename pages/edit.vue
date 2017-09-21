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
            <select class="form-control input-sm" id="selectCar" style="margin-left: 10px">
              <option v-for="item in getClassifyList">{{item.name}}</option>
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

  </div>

</template>

<script>
  import VmMarkdown from '../components/edit/vm-markdown.vue'
  import EditQuill from '../components/edit/edit-quill.vue'
  import axios from '~/plugins/axios'
  import { mapGetters } from 'vuex'
  export default {
    async asyncData () {
      let { data } = await axios.get('/api/classify')
      console.log('data', data)
      return { data }
    },
    name: 'edit',
    components: {
      VmMarkdown,
      EditQuill
    },
    data: function () {
      return {
        editor: 0,
        title: '',
        author: '',
        tag: '',
        content: '',
        isTop: true,
        canComment: false
      }
    },
    methods: {
      showHtml (html) {
        // get html string here
        //  alert(html)
        console.log(html)
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
          current_name: 'admin',
          publish_time: this.currentTime,
          classify: '',
          content: this.content,
          label: this.parseTag(),
          is_top: this.isTop,
          can_comment: this.canComment
        }
        console.log(sendData)
      },
      parseTag () {
        let charStr = ''
        this.tag.split('').map(char => {
          if (char !== ' ') {
            charStr = charStr + char
          }
        })
        let tagArr = charStr.split(',')
        console.log(tagArr)
        return tagArr
      },
      currentTime () {
        let currentDate = new Date()
        let year = currentDate.getFullYear()
        let month = currentDate.getMonth() + 1 < 10 ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1)
        let date = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate()
        let hours = currentDate.getHours() < 10 ? '0' + currentDate.getHours() : currentDate.getHours()
        let minutes = currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes()
        let seconds = currentDate.getSeconds() < 10 ? '0' + currentDate.getSeconds() : currentDate.getSeconds()
        return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
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

