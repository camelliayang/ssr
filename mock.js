// 单纯的模拟几个接口 

const express = require('express')
const app = express()

app.get('/api/user/info',(req,res)=>{
  // Access-Control-Allow-Origin
  // res.header('Access-Control-Allow-Origin','*')
  // res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
  // res.header('Content-Type',"application/json;charset=utf-8")
  res.json({
    code:0,
    data:{
      name:'Camellia',
      best:'Yang'
    }
  })
})


app.get('/api/learning/list',(req,res)=>{
  // Access-Control-Allow-Origin
  // res.header('Access-Control-Allow-Origin','*')
  // res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
  // res.header('Content-Type',"application/json;charset=utf-8")
  res.json({
    code:0,
    list:[
      {name:'web',id:1},
      {name:'js',id:2},
      {name:'objective-C',id:3},
      {name:'java',id:4},
    ]
  })
})

app.listen(9090,()=>{
  console.log('mock finished')
})