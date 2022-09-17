import React from 'react'

export default function Alert(props) {
  const capitaliaze=(word)=>{
    return word.charAt(0).toUpperCase() + word.slice(1)
  }
  return (
    <div style={{height:"50px"}}>
    {props.alert &&<div className={`alert alert-${props.alert.type} alert-dismissible`}  role="alert">
        <strong>{capitaliaze(props.alert.type==="danger"?"error":props.alert.type)} : </strong>{props.alert.message}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>}
    </div>
  )
}