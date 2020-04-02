import React from 'react'
import {Route} from 'react-router-dom'

function Status({code, children}){
  return <Route render={({staticContext})=>{
    if(staticContext){
      staticContext.statuscode=code // 404
    }
    return children
  }}></Route>
}


function Notfound(props){
  return <Status code={404}>
    <h1>Not found page-404</h1>
    <img id='img-404' alt=""/>
  </Status>
}

export default Notfound