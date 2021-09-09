import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {

    const notesInitial = [
        {
            "_id":"1",
            "title":"note1",
            "description":"note1 desc"
        },
        {
            "_id":"2",
            "title":"note2",
            "description":"note1 desc"
        },
        {
            "_id":"3",
            "title":"note3",
            "description":"note3 desc"
        },
        {
            "_id":"4",
            "title":"note4",
            "description":"note4 desc"
        },
        {
            "_id":"5",
            "title":"note5",
            "description":"note5 desc"
        },
        {
            "_id":"6",
            "title":"note6",
            "description":"note6 desc"
        }
   ];

    const [notes, setNotes] = useState(notesInitial);

    //Add a Note
    const addNote = (title, description, tag) => {
        //TODO : API call
        console.log("Adding a new note..");
        let note = {
            title,
            description,
            tag : tag,
            "_id":tag+"1"
        }
        setNotes(notes.concat(note))
    }

    //Delete a Note
    const deleteNote = () => {
        
    }

    //Edit a Note
    const editNote = () => {
        
    }
    
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            { props.children }
        </NoteContext.Provider>
    )
}

export default NoteState;