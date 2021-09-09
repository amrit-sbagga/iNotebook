import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {

    const notesInitial = [
        {
            "title":"note1",
            "description":"note1 desc"
        },
        {
            "title":"note2",
            "description":"note1 desc"
        },
        {
            "title":"note3",
            "description":"note3 desc"
        },
        {
            "title":"note4",
            "description":"note4 desc"
        },
        {
            "title":"note5",
            "description":"note5 desc"
        },
        {
            "title":"note6",
            "description":"note6 desc"
        }
   ];

    const [notes, setNotes] = useState(notesInitial);
    
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            { props.children }
        </NoteContext.Provider>
    )
}

export default NoteState;