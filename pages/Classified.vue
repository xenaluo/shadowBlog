<template>
    <div>
        <div class="classlist" v-show="true">
    <h2>分类管理</h2>
    <button class="btn btn-default" @click="showAddclass">添加分类</button>
    <table class="table table-hover">
        <thead>
            <tr>
                <td>名称</td>
                <td>操作</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in getClassifyList">
                <td class="col-md-5">{{ item.name }}</td>
                <td class="col-md-7">
                    <button type="button" class="btn btn-primary btn-xs" @click="showUpdateclass(item)">修改</button>&nbsp;&nbsp;
                    <button type="button" class="btn btn-danger btn-xs" @click="showDeleteClass(item)">删除</button>
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
                        <input type="text" class="form-control"  placeholder="分类名称" v-model="name">
                    </div>
                    <button type="button" class="btn btn-default" @click="addClassName(name)">Submit</button>
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
                    <button type="button" class="btn btn-default" @click="updateClass(updateItem)">Submit</button>
                </form>
                <button type="button" class="close" aria-label="Close" @click="closeBox(3)"><span aria-hidden="true">&times;</span></button>
            </div>

        </div>
        <div class="delete" v-if="isDelete">
            <p>确认删除当前分类</p>
            <div class="btn-box">
                <span class="xbtn btn-confirm" @click="deleteClass(deleteItem)">确认</span>
                <span class="xbtn btn-cancel" @click="cancelDelete">取消</span>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from '~/plugins/axios'
    import Qs from '~/plugins/qs'
    import { mapGetters } from 'vuex'
    export default {
//      async asyncData () {
//        let { data } = await axios.get('/api/classify')
//        console.log('data', data)
//        return { items: data }
//      },
      async fetch ({ store, params }) {
        let { data } = await axios.get('/api/classify')
        store.dispatch('classify/initClassifyList', data)
      },
      data: function () {
        return {
          isShow1: true,
          isShow2: false,
          isShow3: false,
          name: '',
          items: [],
          updateItem: {},
          deleteItem: {},
          isDelete: false
        }
      },
      methods: {
        // 点击 [添加分类] 按钮
        showAddclass () {
          this.isShow2 = true
        },
        // 点击 [修改] 按钮
        showUpdateclass (item) {
          console.log(item)
          this.isShow3 = true
          this.updateItem = item
          this.name = item.name
        },
        showDeleteClass (item) {
          this.isDelete = true
          this.deleteItem = item
        },
        // 点击 更新分类 [submit] 按钮
        updateClass (item) {
          console.log('item', item)
          // console.log(this.name)
          let path = `/api/classify/update/${this.updateItem.name}`
          let sendData = Qs.stringify({name: this.name})
          axios.post(path, sendData).then(response => {
            console.log(response)
            if (!response.data.status) {
              alert(response.data.msg)
            } else {
              this.isShow3 = false
              this.$store.dispatch('classify/updateClassify', {name: this.name, oldName: this.updateItem.name})
              this.name = ''
            }
          })
        },
        // 点击 添加分类 [submit] 按钮
        addClassName (name) {
          console.log(this.name)
          axios.post(`api/classify/${name}`).then(response => {
            if (!response.data.status) {
              alert(response.data.msg)
            } else {
              this.isShow2 = false
              this.$store.dispatch('classify/addClassify', {name: this.name})
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
          console.log(item)
          axios.post(`api/classify/delete/${item.name}`).then(response => {
            // console.log(response)
            if (!response.data.status) {
              alert(response.data.msg)
            } else {
              this.isDelete = false
              this.$store.dispatch('classify/deleteClassify', this.deleteItem)
            }
          })
        },
        cancelDelete () {
          this.isDelete = false
        }
      },
      computed: {
        ...mapGetters('classify', [
          'getClassifyList'
        ])
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
    .delete{
        position: fixed;
        top: 300px;
        left: 40%;
        padding-top: 30px;
        width: 20%;
        margin: 0 auto;
        text-align: center;
        background: rgba(208, 208, 208, 0.1);
        box-shadow: 0 0 10px rgba(109, 109, 109, 0.3);
        .btn-box{
            display: flex;
            margin-top: 20px;
            line-height: 30px;
            .xbtn{
                cursor: pointer;
                border-top: 1px solid #bababa;
                display: block;
                flex-grow: 1;
                &:nth-child(1){
                    border-right: 1px solid #bababa;
                }
            }
        }
    }

</style>