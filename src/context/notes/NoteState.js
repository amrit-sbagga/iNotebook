import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = [
        {
            "_id":"1",
            "title":"note1",
            "description":"note1 desc"
        },
        {
            "_id":"2",
            "title":"note2",
            "description":"note1 desc"
        },
        {
            "_id":"3",
            "title":"note3",
            "description":"note3 desc"
        },
        {
            "_id":"4",
            "title":"note4",
            "description":"note4 desc"
        },
        {
            "_id":"5",
            "title":"note5",
            "description":"note5 desc"
        },
        {
            "_id":"6",
            "title":"note6",
            "description":"note6 desc"
        }
   ];

    const [notes, setNotes] = useState(notesInitial);

    async function postData(url = '', data = {}){
        const response = await fetch(url, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNGQwOTQyZmY0ZGQxMDU5ODQ4NTA4In0sImlhdCI6MTYzMDg1MjkyNX0.q4y1fxhHdiafUbEJ1FM-oyj62CLc2VgYioxwoRYazHM"
            },
            body : JSON.stringify(data)
        });
        return response.json();
    }

    //Add a Note
    const addNote = async (title, description, tag) => {
        console.log("Adding a new note..");
        const url = `${host}/api/notes/addnote`;
        postData(url, {title, description, tag})
            .then(data => {
                console.log(data);
            });
        
        let note = {
            title,
            description,
            tag : tag,
            "_id":tag+"1"
        }
        setNotes(notes.concat(note))
    }

    //Delete a Note
    const deleteNote = (id) => {
        //TODO - delete api call
        console.log("Deleting the note with id: " + id);
        let newNotes = notes.filter((note) => {
            return note._id !== id;
        });
        setNotes(newNotes);
    }

    //Edit a Note
    const editNote = async (id, title, description, tag) => {
        //API Call
        const url = `${host}/api/notes/updatenote/${id}`
        postData(url, {title, description, tag})
            .then(data => {
                console.log(data);
            });

        for (let index = 0; index < notes.length; index++) {
            const element = array[index];
            if(element._id === id){
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
            
        }
        
    }
    
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            { props.children }
        </NoteContext.Provider>
    )
}

export default NoteState;