<template>
    <div>
        <div class="classlist" v-show="true">
    <h2>分类管理</h2>
    <button class="btn btn-default" @click="showAddclass" >添加分类</button>
    <table class="table table-hover">
        <thead>
            <tr>
                <td>名称</td>
                <td>操作</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items">
                <td>{{ item.name }}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs" @click="showUpdateclass(item)">修改</button>&nbsp;&nbsp;
                    <button type="button" class="btn btn-danger btn-xs" @click="deleteClass(item)">删除</button>
                </td>
            </tr>
        </tbody>
    </table>
        </div>
        <div class="addClass" v-show="isShow2">
            <div class="add-box">
                <h2>增加分类</h2>
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control"  placeholder="分类名称" v-model="newName">
                    </div>
                    <button type="button" class="btn btn-default" @click="addClassName(newName)">Submit</button>
                </form>
                <button type="button" class="close" aria-label="Close" @click="closeBox(2)"><span aria-hidden="true">&times;</span></button>
            </div>

        </div>
        <div class="updateClass addClass" v-show="isShow3">
            <div class="add-box">
                <h2>修改分类名称</h2>
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control"  placeholder="分类名称" v-model="name">
                    </div>
                    <button type="button" class="btn btn-default" @click="updateClass">Submit</button>
                </form>
                <button type="button" class="close" aria-label="Close" @click="closeBox(3)"><span aria-hidden="true">&times;</span></button>
            </div>

        </div>
    </div>
</template>
<script>
    import axios from '~/plugins/axios'
    import Qs from '~/plugins/qs'

    export default {
      async asyncData () {
        let { data } = await axios.get('/api/classify')
        return { items: data }
      },
      data: function () {
        return {
          isShow1: true,
          isShow2: false,
          isShow3: false,
          name: '',
          newName: '',
          items: [],
          updateItem: {}
        }
      },
      methods: {
        showAddclass () {
          this.isShow2 = true
        },
        showUpdateclass (item) {
          this.isShow3 = true
          this.updateItem = item
          this.name = item.name
        },
        updateClass (item) {
          console.log(this.updateItem)
          console.log(this.name)
          let path = `/api/classify/update/${this.updateItem._id}`
          let sendData = Qs.stringify({name: this.name})
          axios.post(path, sendData).then(response => {
            console.log(response)
            if (!response.data.status) {
              alert(response.data.msg)
            } else {
              this.isShow3 = false
              this.name = ''
            }
          })
        },
        addClassName (name) {
          axios.post(`api/classify/${name}`).then(response => {
            console.log(response)
            if (!response.data.status) {
              alert(response.data.msg)
            } else {
              this.isShow2 = false
              this.name = ''
            }
          })
        },
        closeBox (box) {
          if (box === 3) {
            this.isShow3 = false
          }
          if (box === 2) {
            this.isShow2 = false
          }
          this.name = ''
        },
        deleteClass (item) {
          axios.post(`api/classify/delete/${item._id}`).then(response => {
            console.log(response)
            if (!response.data.status) {
              alert(response.data.msg)
            } else {
              if (response.data.status) {
                axios.get('/api/classify').then(response => {
                  this.items = response.data
                })
              }
            }
          })
        }
      },
      watch: {
        isShow2 () {
          axios.get('/api/classify').then(response => {
            this.items = response.data
          })
        },
        isShow3 () {
          axios.get('/api/classify').then(response => {
            this.items = response.data
          })
        }
      }
    }
</script>
<style lang="scss">
    .addClass{
        /*width:300px;*/
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        /*top:100px;*/
        /*left:300px;*/
        background: rgba(0, 0, 0, .6);
        z-index: 2;
    }
    .add-box{
        padding: 10px 20px 30px;
        position: fixed;
        top: 300px;
        width: 30%;
        left: 35%;
        background: #fff;
        box-shadow: 0 0 50px rgba(255, 255, 255, .8);
        h2{
            text-align: center;
        }
        .close{
            position: absolute;
            top: 5px;
            right: 10px;
        }
    }

</style>