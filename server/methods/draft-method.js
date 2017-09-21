import ArticleModel from '../models/Article'
class Draft {
  async Method1 (req, res) {
    const article = {
      title: req.body.title,
      content: req.body.content,
      date: Date(),
      tags: req.body.tags,
      isPublish: false
    }
    new ArticleModel(article).save()
    res.status(200).send('succeed in saving new draft')
  }
  async Method2 (req, res) {
    const aid = req.params.aid
    const article = {
      title: req.body.title,
      tags: req.body.tags,
      date: Date(),
      content: req.body.content,
      isPublish: false
    }
    ArticleModel.update({aid: aid}, article, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        res.status(200).send('succeed in updating ---' + data.title)
      }
    })
  }
  async Method3 (req, res) {
    const page = req.query.payload.page
    const limit = req.query.payload.limit - 0 || 8
    const skip = limit * (page - 1)
    ArticleModel.find({isPublish: false}).sort({date: -1}).limit(limit).skip(skip).exec().then((articles) => {
      res.send(articles)
    }).catch((err) => {
      console.log(err)
    })
  }
}
export default new Draft()
