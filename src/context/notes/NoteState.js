import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {
    const s1 = {
        "name" : "Amrit",
        "class" : "1A"
    }

    const [state, setState] = useState(s1);
    const update = () => {
        setTimeout(() => {
            setState({
                "name" : "Monty",
                "class" : "20A"
            })
        }, 2000);
    }

    return (
        <NoteContext.Provider value={{state, update}}>
            { props.children }
        </NoteContext.Provider>
    )
}

export default NoteState;