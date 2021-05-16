const User = require('../model/user')

/***
     * 登录界面中间件
     */
  module.exports ={
      /***
       * 匹配数据局内用户数据进行登录
       */
    login : (req,res,next)=>{
        let {username,password} =req.body
       User.login(username,password).then(results=>{
        req.redirect('/')
    }).catch(err => {
        next(err)
    })
   }
   
}
