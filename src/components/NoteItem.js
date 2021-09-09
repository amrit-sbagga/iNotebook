import React from 'react'

export const NoteItem = (props) => {
    const {note} = props;
    const {title, description} = note;
    return (
        <div className="col-md-3 my-3 mx-3">
            <div className="card" style={{"width": "18rem"}}>
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{title}</h5>
                        <i className="far fa-trash-alt mx-2"></i>
                        <i className="far fa-edit mx-2"></i>
                    </div>
                    <p className="card-text">{description} </p>
                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>  
        </div>  
    )
}
