import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from "../context/notes/noteContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote';

export const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({id : "", etitle:"", edescription:"", etag:""})

    // fetch notes one time
    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id : currentNote._id,
            etitle : currentNote.title,
            edescription : currentNote.description,
            etag : currentNote.tag    
        });
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    const handleClick = (e) => {
        e.preventDefault();
        console.log("updating the note..!!", note);
        //addNote(note.title, note.description, note.tag);
        editNote(note.id, note.etitle, note.edescription, note.etag);

        refClose.current.click()
    }

    return (
        <>
            <AddNote />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#editModalCenter">
            Launch demo modal
            </button>

            <div className="modal fade" id="editModalCenter" tabIndex="-1" role="dialog" aria-labelledby="editModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" 
                                    placeholder="title" onChange={onChange} value={note.etitle}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription"
                                    placeholder="description" onChange={onChange} value={note.edescription}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tag">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" placeholder="tag" 
                                    onChange={onChange} value={note.etag}/>
                                </div>
                            </form>  
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={refClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <h2>Your Notes</h2>
            <div className="row my-3">
                {notes.map((note) => {
                   // console.log("note id = ", note._id);
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}
