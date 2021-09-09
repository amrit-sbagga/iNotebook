import React, {useContext} from 'react';
import noteContext from "../context/notes/noteContext";
import { NoteItem } from './NoteItem';

export const Notes = () => {
    const context = useContext(noteContext);
    const {notes, setNotes} = context;
    return (
        <>
        <h2>Your Notes</h2>
        <div className="row my-3">
            {notes.map((note)=>{
                return <NoteItem note={note}/>
            })}
        </div>
        </>
    )
}
