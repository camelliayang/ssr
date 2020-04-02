// 这里的node代码。会用babel处理
import fs from 'fs'
import path from 'path'
import React from 'react'
import {renderToString } from 'react-dom/server'
import express from 'express'
import {StaticRouter,matchPath, Route,Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import  proxy from 'http-proxy-middleware'
import Helmet from 'react-helmet'
import config from './config'
import {getServerStore} from '../src/store/store'
import routes from '../src/App'
import Header from '../src/component/Header'

const store = getServerStore()
const app = express()
app.use(express.static('public'))

app.use(
  '/api',
  proxy({ target: 'http://localhost:9090', changeOrigin: true })
);
function csrRender(res){
  const file = path.resolve(process.cwd(),'public/index.spa.html')
  let html = fs.readFileSync(file,"utf-8")
  return res.send(html)
}
app.get('*',(req,res)=>{
  if(req.query._mode==='csr'){
    console.log('Client side rendering')
    return csrRender(res)
  }
  if(config.csr){
    console.log('csr')
    return csrRender(res)
  }

  const promises = [];
  // use `some` to imitate `<Switch>` behavior of selecting only
  // Router
  routes.some(route=>{
    const match = matchPath(req.path,route)
    console.log(match)

    if(match){
      const {loadData} = route.component
      if(loadData){
        const promise = new Promise((resolve,reject)=>{
          loadData(store).then(resolve).catch(resolve)
        })
        promises.push(promise)
      }
    }
  })

  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
  Promise.all(promises).then(()=>{
    const context = {
      css:[]
    }
    // react component to html
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <Header></Header>
          <Switch>
            {routes.map(route=><Route {...route}></Route>)}

          </Switch>
        </StaticRouter>
      </Provider>

    )
    const css = context.css.length ? context.css.join('\n') : '' 
    const helmet = Helmet.renderStatic()
    console.log('helmet',helmet)
    if(context.statuscode){
      res.status(context.statuscode)
    }
    if(context.action=="REPLACE"){
      res.redirect(301, context.url)
    }
    res.send(`
    <html>
      <head>
        <meta charset="utf-8"/>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <style>
          ${css}
        </style>
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.__context=${JSON.stringify(store.getState())}
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>

    `)
  }).catch(()=>{
    res.send('Error page 500')
  })
  
})
app.listen(9093,()=>{
  console.log('listen finished')
})

