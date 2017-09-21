import ArticleModel from '../models/Article'
class Article {
  /**
   * 在构造函数中给类中的方法绑定this
   */
  constructor () {
    this.commitNewArticle = this.commitNewArticle.bind(this)
  }

  /**
   * 提交新文章--入article库
   * @param req
   * @param res
   */
  commitNewArticle (req, res) {
    let articleModel = this.articleModel(req.body)
    articleModel.save()
      .then(response => {
        res.send({
          status: 1,
          type: 'ADD_ARTICLE_SUCCESS',
          msg: 'success'
        })
      })
      .catch(() => {
        res.send({
          status: 0,
          type: 'ADD_ARTICLE_FAIL',
          msg: 'success'
        })
      })
  }
  /**
   * 解析request中的标签字符串为数组
   * @param tag request中的标签字符串
   * @returns {Array} 解析后的标签数组
   * TODO: '' ——>split
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
  articleID () {
    return new Date().getTime().toString()
  }

  /**
   * 根据ArticleModel生成一个文章模型
   * @param data 文章模型的数据
   * @return {Object} 文章模型
   */
  articleModel (data) {
    return new ArticleModel({
      aid: this.articleID(),
      title: data.title,
      state: data.state,
      author: data.author,
      current_name: data.current_name,
      publish_time: data.publish_time,
      images: data.image,
      classify: data.classify,
      content: data.content,
      label: this.parseTag(data.label),
      is_top: data.is_top,
      can_comment: data.can_comment
    })
  }
}
export default new Article()
