import React from 'react'
import {connect} from 'react-redux'
import {getUserInfo} from '../store/user'
import {Redirect} from 'react-router-dom'
function User(props){
  // 比如登录逻辑潘盾构
  // 没登录跳转到登录也 判断cookie 判断localStorage
  console.log(props.userinfo)
  return <Redirect to="/about"></Redirect>
  // <div>
  //   <h1>
  //     你好{props.userinfo.name}!,你们最棒的人是{props.userinfo.best}
  //   </h1>
  // </div>
}
User.loadData = (store)=>{
  return store.dispatch(getUserInfo())
}
export default connect(
  state=>{
    return {
      userinfo:state.user.userinfo
    }
  }
)(User)
