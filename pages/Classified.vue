<template>
  <div>
    <div class="classlist" v-show="true">
      <h2>分类管理</h2>
      <button class="btn btn-default"
              @click="showAddclass">添加分类</button>
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
        </tr>
        </tbody>
      </table>
    </div>
    <div class="cover" v-show="isShow2">
      <div class="add-box">
        <h2>增加分类</h2>
        <form>
          <div class="form-group">
            <input type="text"
                   class="form-control"
                   placeholder="分类名称"
                   v-model="name">
          </div>
          <button type="button"
                  class="btn btn-default"
                  @click="addClassName">
            Submit</button>
        </form>
        <button type="button"
                class="close"
                aria-label="Close"
                @click="closeBox(2)">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <div class="updateClass cover" v-show="isShow3">
      <div class="add-box">
        <h2>修改分类名称</h2>
        <form>
          <div class="form-group">
            <input type="text"
                   class="form-control"
                   placeholder="分类名称"
                   v-model="name">
          </div>
          <button type="button"
                  class="btn btn-default"
                  @click="updateClass(updateItem)">
            Submit</button>
        </form>
        <button type="button"
                class="close"
                aria-label="Close"
                @click="closeBox(3)">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <div class="cover" v-if="isDelete">
      <div class="delete">
        <p>确认删除当前分类</p>
        <div class="btn-box">
          <span class="xbtn btn-confirm"
                @click="deleteClass(deleteItem)">
            确认</span>
          <span class="xbtn btn-cancel"
                @click="cancelDelete">
            取消</span>
        </div>
      </div>
    </div>
    <ErrMsgBox></ErrMsgBox>
  </div>
</template>
<script>
  import ErrMsgBox from '../components/err-msg-box.vue'
  import axios from '~/plugins/axios'
  import Qs from '~/plugins/qs'
  import {mapGetters} from 'vuex'

  export default {
    async fetch ({store, params}) {
      let {data} = await axios.get('/api/classify')
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
    components: {
      ErrMsgBox
    },
    methods: {
      /**
       * 点击 [添加分类] 按钮
       *  --> 添加分类div显示
       */
      showAddclass () {
        this.isShow2 = true
      },
      /**
       * 点击 [修改] 按钮
       *  --> 修改分类div显示 设置this.updateItem(要更新的分类)为当前点击的分类 this.name为当前分类的名称
       * @param item 需要修改的分类
       */
      showUpdateclass (item) {
        console.log(item)
        this.isShow3 = true
        this.updateItem = item
        this.name = item.name
      },
      /**
       * 点击 [删除] 按钮
       *  --> 弹出确认删除div 设置this.deleteItem(要删除的分类)为当前点击的分类
       * @param item 需要删除的分类
       */
      showDeleteClass (item) {
        this.isDelete = true
        this.deleteItem = item
      },
      /**
       * 点击 更新分类 [submit] 按钮 修改数据库中分类和state中分类
       *  --> this.name不为空 发送patch请求
       *      ${this.updateItem.name}--oldName sendData--newName
       *      更新成功后关闭修改分类div 更改state中classifyList
       */
      updateClass () {
        if (this.name === '') {
          this.showErrorBox('分类名称不能为空')
          return
        }
        let path = `/api/classify/${this.updateItem.name}`
        let sendData = Qs.stringify({name: this.name})
        axios.patch(path, sendData).then(response => {
          console.log(response)
          if (!response.data.status) {
            this.showErrorBox(response.data.msg)
          } else {
            this.isShow3 = false
            this.$store.dispatch('classify/updateClassify', {name: this.name, oldName: this.updateItem.name})
            this.name = ''
          }
        })
      },
      /**
       * 点击 添加分类 [submit] 按钮 将分类添加到数据库classify表和state中的classifyList
       *  --> this.name不为空 发送post请求
       *      ${this.name}--新增分类的名称
       *      更新成功后关闭增加分类div 新增的分类添加到state的classifyList中
       */
      addClassName () {
        if (this.name === '') {
          this.showErrorBox('分类名称不能为空')
        } else {
          axios.post(`api/classify/${this.name}`).then(response => {
            if (!response.data.status) {
              this.showErrorBox(response.data.msg)
            } else {
              this.isShow2 = false
              this.$store.dispatch('classify/addClassify', {name: this.name})
              this.name = ''
            }
          })
        }
      },
      /**
       * 点击右上角✘ 取消修改
       * @param box 关闭哪个div
       */
      closeBox (box) {
        if (box === 3) {
          this.isShow3 = false
        }
        if (box === 2) {
          this.isShow2 = false
        }
        this.name = ''
      },
      /**
       * 点击确认删除div中的确认 删除分类
       * @param item 要删除的分类
       */
      deleteClass (item) {
        axios.delete(`api/classify/${item.name}`).then(response => {
          if (!response.data.status) {
            this.showErrorBox(response.data.msg)
          } else {
            this.isDelete = false
            this.$store.dispatch('classify/deleteClassify', this.deleteItem)
          }
        })
      },
      /**
       * 点击确认删除div中的取消 取消确认删除div
       */
      cancelDelete () {
        this.isDelete = false
      },
      /**
       * 显示错误信息
       * @param msg 错误信息
       */
      showErrorBox (msg) {
        this.$store.dispatch('showErrMsg', msg)
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
  .cover {
    /*width:300px;*/
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /*top:100px;*/
    /*left:300px;*/
    background: rgba(0, 0, 0, .6);
    z-index: 2;
  }

  .add-box {
    padding: 10px 20px 30px;
    position: fixed;
    top: 300px;
    width: 30%;
    left: 35%;
    background: #fff;
    box-shadow: 0 0 50px rgba(255, 255, 255, .8);
    h2 {
      text-align: center;
    }
    .close {
      position: absolute;
      top: 5px;
      right: 10px;
    }
  }

  .delete {
    position: fixed;
    top: 300px;
    left: 35%;
    padding-top: 45px;
    width: 30%;
    margin: 0 auto;
    text-align: center;
    /*border: 1px solid #000;*/
    background: #fff;
    box-shadow: 0 0 50px rgba(255, 255, 255, .8);
    font-size: 18px;
    /*background: rgba(0, 0, 0, .1);*/
    /*color: #fff;*/
    .btn-box {
      font-size: 16px;
      display: flex;
      margin-top: 45px;
      line-height: 50px;
      .xbtn {
        cursor: pointer;
        border-top: 1px solid #bababa;
        display: block;
        flex-grow: 1;
        &:nth-child(1) {
          border-right: 1px solid #bababa;
          color: #f00;
        }
      }
    }
  }

</style>