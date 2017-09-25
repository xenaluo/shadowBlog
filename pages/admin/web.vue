<template>
    <div>
        <h1>站点管理</h1>
        <div class="row">
            <div class="col-md-1"></div>
            <div class="logo panel panel-default col-md-4">
                <div class="panel-heading">博客名称</div>
                <input type="text" class="word upload form-control" v-model="blogname">
                <p class="help-block">自定义对本站点的描述信息</p>
                <!--<input type="file"  class="upload" @change="uploadImg($event) ">-->
                <!--<p class="help-block">logo建议使用200px * 100px</p>-->
                <!--<button type="button" class="btn btn-info" @click="uploadimg($event)">上传</button>-->
            </div>
            <div class="col-md-2"></div>
            <div class="solgan logo panel panel-default col-md-4">
                <div class="panel-heading">站点描述</div>
                <input type="text" class="word upload form-control" v-model="blogdesc">
                <p class="help-block">自定义对本站点的描述信息</p>
            </div>
            <div class="col-md-1"></div>
        </div>
        <div class="row">
            <div class="col-md-1"></div>
            <div class="solgan logo panel panel-default col-md-4" >
                <div class="panel-heading">备案信息</div>
                <input type="text" class="word upload form-control " v-model="beiannum">
                <p class="help-block">如有备案信息,请在此处填写</p>
            </div>
            <div class="col-md-2"></div>
            <div class="solgan logo panel panel-default col-md-4">
                <div class="panel-heading">统计信息</div>
                <input type="text" class="word upload form-control" v-model="webnum">
                <p class="help-block">请在此处填写站点统计代码</p>

            </div>
            <div class="col-md-1"></div>
        </div>
        <button type="button" class="btn btn-success" @click="webMessage">保存</button>
    </div>
</template>
<script>
  import axios from '~/plugins/axios'
  import Qs from '~/plugins/qs'
  export default {
    data: function () {
      return {
        blogname: '',
        blogdesc: '',
        beiannum: '',
        webnum: '',
        name: ''
      }
    },
    methods: {
      webMessage () {
        let name = localStorage.getItem('name')
        let blogMessage = {
          adminname: name,
          blogname: this.blogname,
          blogdesc: this.blogdesc,
          beiannum: this.beiannum,
          webnum: this.webnum
        }
        axios.post('/api/blogmess', Qs.stringify(blogMessage)).then(response => {
          if (response.data === 1) {
            console.log('666')
          }
        })
      }
    }
  }
</script>
<style>
    .logo {
        height: 200px;
        display: inline-block;
        margin-right: 20px;
        padding: 0;
    }

    .upload, .help-block {
        margin: 20px;
    }

    .btn {
        margin: 0 20px;
    }
    .form-control{
        width: 90%;
    }
    .panel-default>.panel-heading{
        background-color: black;
        color: #fff;
    }
    .btn-success{
        margin-left: 90%;
    }
</style>
