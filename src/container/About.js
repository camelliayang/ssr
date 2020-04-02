import React from 'react'
import styles from './About.css'
import Helmet from 'react-helmet'
function About(props){
  return <div>
    <Helmet>
      <title >SSR About Page</title>
      <meta name="keywords" content="About myself" />
      <meta name="description" content="A fullstack developer" />
    </Helmet>
    <h1 className={styles.title}>Login</h1>
  </div>
}
export default About
