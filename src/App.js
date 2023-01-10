import React, { useState, useReducer } from 'react'
import {v4 as uuid} from 'uuid'

import './index.scss'

const initialNoteState = {
    lastNoteCreated: null,
    totalNotes: 0,
    notes:[],
}

const notesReducer = (prevState, action) =>{
    switch(action.type){
        case'ADD_NOTE': {
            const newState = {
                lastNoteCreated: new Date().toTimeString().slice(0,8),
                totalNotes: prevState.notes.length +1,
                notes:[...prevState.notes, action.payload]
            }
            console.log('After : ',newState)
            return newState
        }

    }

}

const App = () => {
    const [notesState, dispatch] = useReducer(notesReducer, initialNoteState)
    const [noteInput, setNoteInput] = useState('')

    const addNote = (event) => {
        event.preventDefault()

        if(!noteInput){
            return
        }

        const newNote = {
            id: uuid(),
            text: noteInput,
            rotate: Math.floor(Math.random() * 20) // to get the random number to be whole number
        }

        dispatch({ type: 'ADD_NOTE', payload: newNote})
    }

    return(
        <div className='app' >
            <h1>
                Sticky Notes
            </h1>
            <form onSubmit={addNote} className='note-form'>
                <textarea value={noteInput}
                onChange={event => setNoteInput(event.target.value)} 
                placeholder='Add new note...'></textarea>
                <button>Add</button>

                {notesState}
                
             

            </form>

        </div>
    )
}

export default App