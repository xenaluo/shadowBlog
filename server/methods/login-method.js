import UserModel from '../models/User'
import jwt from 'jsonwebtoken'
import sha1 from 'sha1'
import config from '../config'
const secret = config.jwt

// import User from '../models/User'
class Login {
  constructor () {
    this.login = this.login.bind(this)
  }
  async login (req, res) {
    UserModel.findOne({name: req.body.name}, (err, doc) => {
      if (err) {
        console.log(err)
      } else if (doc) {
        const salt = doc.salt
        if (doc.password === sha1(req.body.password + salt)) {
          const token = this.creatToken(doc._id, doc.name)
          res.status(200).send({
            id: doc._id,
            name: doc.name,
            token: token
          })
        } else {
          res.status(401).end()
        }
      }
    })
  }
  creatToken (id, name) {
    return jwt.sign({
      id: id,
      name: name
    }, secret.cert, {expiresIn: '7d'})
  }
}
export default new Login()
