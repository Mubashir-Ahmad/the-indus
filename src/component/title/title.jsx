import React from 'react'
import Helmet from 'react-helmet'
const Metatitle =({title})=> {
  return( <Helmet>  
    <title>{title}</title>
  </Helmet>)
}

export default Metatitle