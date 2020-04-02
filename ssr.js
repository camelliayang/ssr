const express = require('express')
const puppeteer = require('puppeteer')
const app = express()

async function test(){
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://google.com/')
  await browser.close()
}
// test()
const urlCache = {}
app.get('*', async function(req,res){
  console.log(req.url)
  // Loop through all routers add cache
  if(urlCache[url]){
    return res.send(urlCache[url])
  }
  if(req.url=='/favicon.ico'){
    return res.send({code:0})
  }
  const url = 'http://localhost:9093'+req.url
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url,{
    waitUntil:['networkidle0']
  })
  const html = await page.content()
  console.log(html)
  urlCache[url] = html
  res.send(html)
})
app.listen(8081,()=>{
  console.log('ssr server start')
})