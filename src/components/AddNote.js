import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'

const AddNote = (props) => {
  const context=useContext(NoteContext)
  const {addNote}=context
  const [note,setNote]=useState({title:"",description:"",tag:""})
  
  const handleClick=(e)=>{
    e.preventDefault()
    addNote(note)
    props.showAlert("success","Note Added Successfully")
    setNote({title:"",description:"",tag:""})
  }
  const onChange=(event)=>{
      setNote({
        ...note,[event.target.name]:event.target.value
      })
  }
  return (
    <div>
      <h2>Add a Note</h2>
        <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" onChange={onChange} value={note.title} className="form-control" name="title" id="title" aria-describedby="titleHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" onChange={onChange} value={note.description} className="form-control" name='description' id="description" />
          </div>
          <div className="mb-3 ">
            <label htmlFor="tag" className="form-label" >Tag</label>
            <input type="text" onChange={onChange} value={note.tag} className="form-control" name='tag' id="tag" />
          </div> 
          <button type="button" onClick={handleClick} className="btn btn-dark">Add Note</button>
        </form>
    </div>
  )
}

export default AddNote
