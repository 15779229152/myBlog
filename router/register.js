
const connection = require('../model/model')
const express = require('express');
registerApp =express()
   

registerApp.get('/',(req,res)=>{                                          //
    res.render('register',{msg:''})                                      //
})                                   
registerApp.post('/registers',(req,res)=>{
    
    var name = req.body.name;
    console.log(name)
    var password = req.body.password;
    console.log(password)
    var data = [password,name];
    console.log(data);
    var _res = res;
    var sql_add = 'INSERT INTO user(username,password) VALUES(?,?)';//添加数据
    var sql_select = 'SELECT * FROM user';//查询数据
    connection.query(sql_select,function(err,result){
        if(err){
            res.send(err.message);
            return;
        }else{
            var ta = true;
            result.forEach(item => {
                if(item.password == password && item.username == name){
                    res.send('您的账号已被注册，清重新注册！');
                    ta = false;
                    return;
                }
            });
            if(ta){
                connection.query(sql_add,data,function(err,result){
                    if(err){
                     res.send(err.message);
                      return res.redirect('/index');
                    }
                    res.send('注册成功；');
                
                 })
            }
        }
       
    })

})


module.exports = registerApp
