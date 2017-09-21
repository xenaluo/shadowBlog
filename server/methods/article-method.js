import ArticleModel from '../models/Article'
class Article {
  constructor () {
    this.commitNewArticle = this.commitNewArticle.bind(this)
  }
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
  // todo: '' ——>split
  parseTag (tag) {
    let charStr = ''
    tag.split('').map(char => {
      if (char !== ' ') {
        console.log(char, 'char')
        charStr = charStr + char
      }
    })
    let tagArr = charStr !== '' ? charStr.split(',') : []
    return tagArr
  }
  articleID () {
    return new Date().getTime().toString()
  }
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
