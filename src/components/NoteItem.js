import React from 'react'

export const NoteItem = (props) => {
    const {note} = props;
    const {title, description} = note;
    return (
        <div className="col-md-3 my-3 mx-3">
            <div className="card" style={{"width": "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita nihil excepturi, laudantium, suscipit quos labore possimus error quidem quam itaque sed inventore enim amet? Beatae cum libero laudantium saepe pariatur?</p>
                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>  
        </div>  
    )
}
