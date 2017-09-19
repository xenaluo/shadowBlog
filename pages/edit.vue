<template>
  <div class="edit-article">
    <!--<button class="show-editor" @click="showEditor"></button>-->
    <button type="button" class="btn btn-default btn-xs show-editor" @click="showEditor">{{changeEditor}}</button>
    <form action="">
      <div class="form-group">
        <input type="text" class="form-control" id="titleInput" placeholder="Title">
      </div>
      <div class="form-group">
        <!--<label for="exampleInputName2">Name</label>-->
        <input type="text" class="form-control" id="authorInput" placeholder="Author">
      </div>
      <div id="edit">
        <VmMarkdown v-if="!editor"
                    :theme="theme"
                    width="100%"
                    height="500px"
                    v-on:gethtml="showHtml"
                    class="markdown"
                    :defaultText="intro">
        </VmMarkdown>
        <EditQuill v-else></EditQuill>
        <!--<ss></ss>-->
      </div>
      <div class="row form-inline">
        <div class="col-md-6">
          <div class="col-md-6" style="padding-left: 0">
            <input type="text" class="form-control input-sm" placeholder="多个标签以英文逗号分隔" style="margin-right: 10px; width: 100%">
          </div>
          <div class="form-group">
            <label for="selectCar">文章分类</label>
            <select class="form-control input-sm" id="selectCar" style="margin-left: 10px">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </div>
        <div class="col-md-6 form-inline" style="text-align: right">
          <label class="checkbox-inline">
            <input type="checkbox" id="inlineCheckbox1" value="option1"> 置顶
          </label>
          <label class="checkbox-inline">
            <input type="checkbox" id="inlineCheckbox2" value="option1"> 允许评论
          </label>
          <input class="btn btn-default" type="button" value="存草稿" style="margin-left: 10px">
          <input class="btn btn-default" type="button" value="发布" style="margin-left: 10px; background-color: #dedede">
        </div>
      </div>
      <div class="row" style="padding-left: 15px">
        选择已有标签:
        <a href="" class="article-tag">aa</a>
        <a href="" class="article-tag">bb</a>
        <a href="" class="article-tag">cc</a>
        <a href="" class="article-tag">dd</a>
      </div>
    </form>

  </div>

</template>

<script>
  import VmMarkdown from '../components/edit/vm-markdown.vue'
  import EditQuill from '../components/edit/edit-quill.vue'
//  import ss from '~/plugins/editor'
  export default {
    name: 'app',
    components: {
      VmMarkdown,
      EditQuill
    },
    data: function () {
      return {
        theme: 'default',
        intro: '',
        editor: 0
      }
    },
    methods: {
      showHtml (html) {
        // get html string here
        //  alert(html)
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
      }
    },
    computed: {
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
</style>

