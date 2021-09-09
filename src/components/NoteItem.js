import React, { useContext } from 'react';
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
    const {note} = props;
    const {title, description} = note;

    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <div className="col-md-3 my-3 mx-3">
            <div className="card" style={{"width": "18rem"}}>
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={() => {deleteNote(note._id)}}></i>
                        <i className="far fa-edit mx-2"></i>
                    </div>
                    <p className="card-text">{description} </p>
                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>  
        </div>  
    )
}

export default NoteItem;