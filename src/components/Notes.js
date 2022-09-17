import React, { useContext, useEffect, useRef,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
const Notes = (props) => {
  const context = useContext(NoteContext)
  const { notes, getNote ,editNote } = context;
  let navigate=useNavigate()
  const ref = useRef(null)
  const refClose=useRef(null)
  const [note,setNote]=useState({_id:"",title:"",description:"",tag:""})
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote()
    }else{
      navigate('/login')
    }
    
    // eslint-disable-next-line
  }, [])

  //this function set the current note to that note which is to be updated 
  const updateNote = (currentNote) => {
    ref.current.click()
    setNote(currentNote)
  }
  
  const handleClick=(e)=>{
    e.preventDefault()
    editNote(note._id,note.title,note.description,note.tag)
    refClose.current.click()
    props.showAlert("success","Note Updated Successfully")
  }
  const onChange=(event)=>{
      setNote({
        ...note,[event.target.name]:event.target.value
      })
  }
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button type="button" ref={ref} className="btn btn-dark d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Update Note
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form className='my-3'>
            <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" required value={note.title} onChange={onChange} className="form-control" name="title" id="title" aria-describedby="titleHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" required value={note.description} onChange={onChange} className="form-control" name='description' id="description" />
                </div>
                <div className="mb-3 ">
                  <label htmlFor="tag" className="form-label" >Tag</label>
                  <input type="text" value={note.tag} onChange={onChange} className="form-control" name='tag' id="tag" />
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleClick} className="btn btn-dark">Update Note</button>
            </div>
            </form>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2 className='my-2'>Your Notes</h2>
        <div className='mx-1'>{notes.length===0 && "No notes to display"}</div>
        {
          notes.map((note) => {
            return(<NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />)
          })
        }
      </div>
    </>
  )
}

export default Notes
