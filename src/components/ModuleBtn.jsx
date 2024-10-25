import React from 'react'
import { Link } from 'react-router-dom'

const ModuleBtn = ({icon,name,url}) => {
  return (
    <Link to={url} className=' bg-sky-500 p-5 rounded-lg text-white flex flex-col items-center gap-3'>
      <p >{icon}</p>
      <p>{name}</p>
    </Link>
  )
}

export default ModuleBtn
