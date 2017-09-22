import ClassifyModel from '../models/Classify'

class Classify {
  async getClassifyList (req, res) {
    let find = await ClassifyModel.find()
    res.send(find)
  }
  async addClassify (req, res) {
    let find = await ClassifyModel.findOne({name: req.params.name})
    console.log(find)
    if (!find) {
      const classify = new ClassifyModel({
        name: req.params.name
      })
      classify.save().then((res) => {
        console.log('插入成功', res)
      })
      res.send({
        status: 1,
        type: 'ADD_CLASSIFY_SUCCESS',
        msg: 'successed'
      })
    } else {
      console.log('已存在')
      res.send({
        status: 0,
        type: 'CLASSIFY_NAME_EXIST',
        msg: '该分类已存在'
      })
    }
  }
  async updateClassify (req, res) {
    ClassifyModel.findOne({name: req.body.name})
      .then(result => {
        console.log('result', result)
        if (result) {
          res.send({
            status: 0,
            type: 'CLASSIFY_NAME_EXIST',
            msg: '该分类已存在'
          })
        } else {
          ClassifyModel.update({name: req.params.name}, {name: req.body.name})
            .then(updateresult => {
              console.log('update', updateresult)
              res.send({
                status: 1,
                type: 'CLASSIFY_UPDATE_SUCCESS',
                msg: 'success'
              })
            })
        }
      })
  }
  deleteClassify (req, res) {
    ClassifyModel.remove({name: req.params.name})
      .then(result => {
        res.send({
          status: 1,
          type: 'CLASSIFY_REMOVE_SUCCESS',
          msg: 'success'
        })
      })
      .catch(() => {
        res.send({
          status: 0,
          type: 'CLASSIFY_REMOVE_FAIL',
          msg: '删除失败'
        })
      })
  }
}

export default new Classify()
