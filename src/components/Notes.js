import React, {useContext} from 'react';
import noteContext from "../context/notes/noteContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote';

export const Notes = () => {
    const context = useContext(noteContext);
    const {notes, addNote} = context;
    return (
        <>
         <AddNote/>
        <h2>Your Notes</h2>
        <div className="row my-3">
            {notes.map((note)=>{
                return <NoteItem key={note._id} note={note}/>
            })}
        </div>
        </>
    )
}
