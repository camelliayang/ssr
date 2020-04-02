import React from 'react'
import {Link} from 'react-router-dom'

function Header(props){
  return <div>
    <Link to="/">Home</Link> | 
    <Link to="/about">About</Link> |
    <Link to="/user">User</Link> |
    <Link to="/zqd13kj">Not there</Link> |
  </div>
}

export default Header