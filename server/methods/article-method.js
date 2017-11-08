import ArticleModel from '../models/Article'
import ClassifyModel from '../models/Classify'
import InceModel from '../models/Inc'
// import db from '../db/db'

class Article {
  /**
   * 在构造函数中给类中的方法绑定this
   */
  constructor () {
    this.commitNewArticle = this.commitNewArticle.bind(this)
    this.id = 0
    this.oldID = 0
  }

  /**
   * 查找所有文章
   */
  async queryArticleList (req, res) {
    ArticleModel.find({})
  }

  /**
   * 查找已发布文章
   * @param req
   * @param res
   * @return {Promise.<void>}
   */
  async getIssueArticle (req, res) {
    // console.log(req.query)
    // let pageSize = parseInt(req.query.pageSize || 10)
    // let currentPage = parseInt(req.query.currentPage)
    // let skipNum = (currentPage - 1) * pageSize
    // console.log(pageSize, currentPage, skipNum)
    // console.log(typeof pageSize, typeof currentPage, typeof skipNum)
    let sort = {'is_top': -1}
    let issueList = await ArticleModel
      .find({state: 1})
      .sort(sort)
      // .skip(skipNum)
      // .limit(pageSize)
    // console.log(issueList)
    let count = await ArticleModel.count({state: 1})
    let data = {
      issueList: issueList,
      count: count
    }
    res.send(data)
  }
  /**
   * 查找草稿箱文章
   * @param req
   * @param res
   * @return {Promise.<void>}
   */
  async getDraftArticle (req, res) {
    console.log(req.query)
    let pageSize = parseInt(req.query.pageSize || 10)
    let currentPage = parseInt(req.query.currentPage || 1)
    let skipNum = (currentPage - 1) * pageSize
    console.log(pageSize, currentPage, skipNum)
    console.log(typeof pageSize, typeof currentPage, typeof skipNum)
    let sort = {'is_top': -1}
    let draftList = await ArticleModel
      .find({state: 0})
      .sort(sort)
      .skip(skipNum)
      .limit(pageSize)
    // console.log(issueList)
    let count = await ArticleModel.count({state: 0})
    let data = {
      draftList: draftList,
      count: count
    }
    res.send(data)
  }

  /**
   * 根据id查找一篇文章
   * @param req
   * @param res
   * @return {Promise.<void>}
   */
  async getSingleArticle (req, res) {
    let singleArticle = await ArticleModel.findOne({aid: req.query.aid})
    let classify = await ClassifyModel.find()
    let responseDate = {
      article: singleArticle,
      classify: classify
    }
    res.send(responseDate)
  }
  /**
   * 提交新文章--入article库
   * @param req
   * @param res
   *
   * 先判断数据库中是否已经存在当前文章的id
   * 如果存在，更新文章
   * 如果不存在，创建新文章
   */
  async commitNewArticle (req, res) {
    let articleLive = await ArticleModel.findOne({aid: req.body.id})
    console.log('a', req.body.id, articleLive)
    if (articleLive) {
      console.log('这是一篇存在的文章，将要更新文章内容')
      let updateData = {
        title: req.body.title,
        state: req.body.state,
        author: req.body.author,
        current_name: req.body.current_name,
        publish_time: req.body.publish_time,
        images: req.body.image,
        classify: req.body.classify,
        md_str: req.body.md_str,
        content: req.body.content,
        label: this.parseTag(req.body.label),
        is_top: req.body.is_top,
        can_comment: req.body.can_comment
      }
      ArticleModel.update({aid: req.body.id}, updateData)
        .then(response => {
          console.log(response)
          res.send({
            status: 1,
            type: 'UPDATE_ARTICLE_SUCCESS',
            msg: 'success'
          })
        })
        .catch(() => {
          console.log('更新文章失败')
          res.send({
            status: 0,
            type: 'UPDATE_ARTICLE_FAIL',
            msg: 'error'
          })
        })
    } else {
      let articleModel = await this.articleModel(req.body)
      articleModel.save()
        .then(response => {
          console.log(this.oldID)
          console.log(this.id)
          InceModel.update({name: 'article'}, {id: this.id})
            .then(response => {
              console.log(response)
              res.send({
                status: 1,
                type: 'ADD_ARTICLE_SUCCESS',
                msg: 'success'
              })
            })
            .catch(() => {
              console.log('更新id失败')
              res.send({
                status: 0,
                type: 'ADD_ARTICLE_FAIL',
                msg: 'error'
              })
            })
        })
        .catch(() => {
          res.send({
            status: 0,
            type: 'ADD_ARTICLE_FAIL',
            msg: '提交文章失败'
          })
        })
    }
  }

  /**
   * 删除文章--从article库中删除
   * @param req
   * @param res
   * 从article库中找到并删除
   */
  deleteArticle (req, res) {
    console.log(req)
    ArticleModel.remove({aid: req.query.id})
      .then(result => {
        res.send({
          status: 1,
          type: 'ARTICLE_REMOVE_SUCCESS',
          msg: 'success'
        })
      })
      .catch(() => {
        res.send({
          status: 0,
          type: 'ARTICLE_REMOVE_FAIL',
          msg: '删除失败'
        })
      })
  }
  /**
   * 解析request中的标签字符串为数组
   * @param tag request中的标签字符串
   * @returns {Array} 解析后的标签数组
   * TODO: '' ——>split, 待修改为前端变字符串为数组并实时转换为button
   */
  parseTag (tag) {
    let charStr = ''
    tag.split('').map(char => {
      if (char !== ' ') {
        charStr = charStr + char
      }
    })
    let tagArr = charStr !== '' ? charStr.split(',') : []
    return tagArr
  }
  /**
   * 设置文章id为时间戳
   * @returns {string} 文章id
   * TODO: 生成文章id方法待修改
   */
  async articleID () {
    let result = await InceModel.findOne()
    this.id = result.id
    this.oldID = result.id
    return this.id++
  }
  /**
   * 根据ArticleModel生成一个文章模型
   * @param data 文章模型的数据
   * @return {Object} 文章模型
   */
  async articleModel (data) {
    let id = await this.articleID()
    return new ArticleModel({
      aid: id,
      title: data.title,
      state: data.state,
      author: data.author,
      current_name: data.current_name,
      publish_time: data.publish_time,
      images: data.image,
      classify: data.classify,
      md_str: data.md_str,
      content: data.content,
      label: this.parseTag(data.label),
      is_top: data.is_top,
      can_comment: data.can_comment
    })
  }
}
export default new Article()
