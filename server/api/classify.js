import { Router } from 'express'
import Classify from '../models/Classify'
// let Classify = require('../models/Classify')
const router = Router()

/* eslint-disable */
// 获取分类

router.get('/classify', async (req, res) => {
  let find = await Classify.find()
  res.send(find)
})

router.post('/classify/add/:name', async (req, res) => {
  let find = await Classify.findOne({name: req.params.name})
  console.log(find)
  if (!find) {
    const classify = new Classify({
      name: req.params.name
    })
    classify.save().then( (res) => {
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
})

router.post('/classify/update/:name', async (req, res) => {
  console.log(req.body)
  console.log(req.params)
  Classify.findOne({name: req.body.name})
    .then(result => {
      console.log('result', result)
      if (result) {
        res.send({
          status: 0,
          type: 'CLASSIFY_NAME_EXIST',
          msg: '该分类已存在'
        })
      } else {
        Classify.update({name: req.params.name}, {name: req.body.name})
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
})

// 删除分类
router.post('/classify/delete/:name', (req, res) => {
  console.log(req.params.name)
  Classify.remove({name: req.params.name})
    .then(result => {
      res.send({
        status: 1,
        type: 'CLASSIFY_REMOVE_SUCCESS',
        msg: 'success'
      })
    })
})

// module.exports = router
export default router
