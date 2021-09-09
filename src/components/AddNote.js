import React, {useContext, useState} from 'react';
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title:"", description:"", tag:"default"})

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    return (    
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className="my-3">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" name="title" placeholder="title" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="description" name="description" placeholder="description" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" placeholder="tag" onChange={onChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary"
                        onClick={handleClick}>Submit</button>
                </form>                            
        </div>
    )
}

export default AddNote;