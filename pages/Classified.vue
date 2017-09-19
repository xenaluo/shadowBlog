<template>
    <div>
        <div class="classlist" v-show="isShow1">
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
                <td>{{ item.message }}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs" @click="updateClass(item.message)">修改</button>&nbsp;&nbsp;
                    <button type="button" class="btn btn-danger btn-xs" @click="deleteClass(item.message)">删除</button>
                </td>
            </tr>
        </tbody>
    </table>
        </div>
        <div class="addClass" v-show="isShow2">
            <h2>增加分类</h2>
            <form>
                <div class="form-group">
                    <label>分类名称</label>
                    <input type="text" class="form-control"  placeholder="分类名称" v-model="newName">
                </div>
                <button type="button" class="btn btn-default" @click="addClassName(newName)">Submit</button>
            </form>
        </div>
        <div class="updateClass addClass" v-show="isShow3">
            <h2>修改分类名称</h2>
            <form>
                <div class="form-group">
                    <label>分类名称</label>
                    <input type="text" class="form-control"  placeholder="分类名称" v-bind:value="name">
                </div>
                <button type="button" class="btn btn-default">Submit</button>
            </form>
        </div>
    </div>
</template>
<script>
    import axios from '~/plugins/axios'
    export default {
      data: function () {
        return {
          isShow1: true,
          isShow2: false,
          isShow3: false,
          name: '',
          newName: '',
          items: []
        }
      },
      created () {
        axios.post('http://localhost:3000/home/shoplist').then((res) => {
          this.items = res.data
        })
      },
      methods: {
        showAddclass () {
          this.isShow2 = true
          this.isShow1 = false
        },
        updateClass (name) {
          this.isShow1 = false
          this.isShow3 = true
          this.name = name
        },
        addClassName (name) {
          console.log('name' + name)
        },
        deleteClass (name) {
          console.log(name)
        }
      }
    }
</script>
<style>
    .addClass{
        width:300px;
        position: fixed;
        /*top:100px;*/
        /*left:300px;*/
        z-index: 2;
    }
</style>