import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {Helmet} from "react-helmet"
import withStyles from '../withStyle'
import {getIndexList} from '../store/index'
import styles from './Index.css'

function Index(props){
  const [count ,setCount] = useState(1)
  useEffect(()=>{
    if(!props.list.length){
      props.getIndexList()
    }
  }, [])
  return <div className={styles.container}>
    <Helmet>
      <title >SSR Home</title>
      <meta name="keywords" content="Web, java EE" />
      <meta name="description" content="React ssr is good" />
    </Helmet>



    <h1 className={styles.title}>Hi {props.title} !  {count}</h1>
    <button onClick={()=>setCount(count+1)}>Add</button>
    <hr/>
      <ul>
        {props.list.map(item=>{
          return <li key={item.id}>{item.name}</li>
        })}
      </ul>
  </div>
}


Index = connect(
  state=>({list:state.index.list}),
  {getIndexList}
)(withStyles(Index,styles))

Index.loadData = (store)=>{
  return store.dispatch(getIndexList())
}

export default Index
