import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {

    const notesInitial = [
        {
            "title":"note1"
        },
        {
            "title":"note2"
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