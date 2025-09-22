import React from 'react'
import { Link } from 'react-router-dom'
import download from "./download.png"
const Logo = () => {
  return (
    <Link to="/">
        <img src={download} style={{ width: "50px", height: "50px" }}/>
    </Link>

  )
}

export default Logo