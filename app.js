const express=require('express')
const session = require('cookie-session')

const app = express()

app.set('view engine','html')
app.set('view',`${__dirname}/views`)
app.engine('html',require('ejs').renderFile)


//静态资源配置
app.use(express.static('static'))

//post请求处理
app.use(express.urlencoded({extended:true}))
//session配置
app.use(session({
    keys:['secret'],
    maxAge:1000 * 60 * 30
}))


//调用index.js
// app.use('/',require('./router/index'))
// app.use('/index',require('./router/index'))
app.use(/\/(index)?/,require('./router/index'))
//调用文章子应用
app.use('/article',require('./router/article'))
//调用搜索子应用
app.use('/search',require('./router/search'))
//调用登录子应用
app.use('/login',require('./router/login'))
//调用注册子应用
app.use('/register',require('./router/register'))
//调用后台首页
app.use(/\/admin\/(index)?/,require('./router/admin/index'))


//退出操作
app.get('/user/logout',(req,res)=>{
    req.session.user = null
    return res.redirect('/index');

})

//监听服务器
app.listen(3000)