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
    console.log('666', req.headers)
    // UserModel.findOne({username: req.body.name}, (err, doc) => {
    //   if (err) {
    //     console.log(err)
    //   } else if (doc) {
    //     if (doc === null) {
    //       res.send('2')
    //     } else {
    //       const salt = doc.salt
    //       if (doc.password === sha1(req.body.password + salt)) {
    //         const token = this.creatToken(doc._id, doc.name)
    //         res.status(200).send({
    //           id: doc._id,
    //           name: doc.name,
    //           token: token
    //         })
    //       } else {
    //         res.send('0')
    //       }
    //     }
    //   }
    // })
    let username = req.body.name
    let doc = await UserModel.findOne({username: username})
    if (doc === null) {
      res.send('2')
    } else {
      const salt = doc.salt
      console.log(salt)
      if (doc.password === sha1(req.body.psd + salt)) {
        console.log(doc.password)
        console.log(req.body.psd)
        const token = this.creatToken(doc._id, doc.username)
        res.status(200).send({
          id: doc._id,
          name: doc.username,
          token: token
        })
      } else {
        res.send('0')
      }
    }
  }
  creatToken (id, name) {
    return jwt.sign({
      id: id,
      name: name
    }, secret.cert, {expiresIn: '7d'})
  }
}
export default new Login()
