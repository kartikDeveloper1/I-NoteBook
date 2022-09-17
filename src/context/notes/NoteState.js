import React, { useState } from "react";
import NoteContext from "./NoteContext";

export default function NoteState(props) {
  const host = "http://localhost:5000"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  //Get  all Notes---------------------------------------------------------------------
  const getNote = async () => {
    //API CALL--
    const url = `${host}/api/notes/fetchallnotes`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const data = await response.json();
    setNotes(data)
  }

  //Add a Note---------------------------------------------------------------------
  const addNote = async (note) => {
    //API CALL--
    const url = `${host}/api/notes/addnote`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(note)
    });
    // eslint-disable-next-line
    const json = await response.json();
    //add logic
    setNotes(notes.concat(json))
  }

  //Delete a Note--------------------------------------------------------------------
  const deleteNote = async (id) => {
    //API call
    const url = `${host}/api/notes/deletenote/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    // eslint-disable-next-line
    const json = await response.json();
    //filter function logic is finding all ids except the id to be deleted and set new notes 
    //without the id we want to remove
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }


  //Edit or Update a Note-------------------------------------------------------------
  const editNote = async (id, title, description, tag) => {
    // console.log("edit")
    //API CALL::
    const url = `${host}/api/notes/updatenote/${id}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}) 
    });
    // eslint-disable-next-line
    const json = await response.json();

    let newNotes=JSON.parse(JSON.stringify(notes))
    //login client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title
        element.description = description
        element.tag = tag
      }
    }
    setNotes(newNotes)
  }
  return (
    <>
      <NoteContext.Provider value={{ notes, setNotes, getNote, addNote, editNote, deleteNote }}>
        {props.children}
      </NoteContext.Provider>
    </>
  )
}
