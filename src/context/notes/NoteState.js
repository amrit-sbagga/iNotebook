import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    async function getData(url){
        const response = await fetch(url, {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNGQwOTQyZmY0ZGQxMDU5ODQ4NTA4In0sImlhdCI6MTYzMDg1MjkyNX0.q4y1fxhHdiafUbEJ1FM-oyj62CLc2VgYioxwoRYazHM"
            }
        });
        return response.json();
    }

    async function makeRestCall(url = '', data = {}, method){
        const response = await fetch(url, {
            method : method,
            headers : {
                'Content-Type' : 'application/json',
                'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNGQwOTQyZmY0ZGQxMDU5ODQ4NTA4In0sImlhdCI6MTYzMDg1MjkyNX0.q4y1fxhHdiafUbEJ1FM-oyj62CLc2VgYioxwoRYazHM"
            },
            body : JSON.stringify(data)
        });
        const resp = await response.json()
        return resp;
    }

    //Get all Notes
    const getNotes = async () => {
        const url = `${host}/api/notes/fetchallnotes`
        const response = await getData(url);
        console.log("getNotes response = ", response);
        if(response.notes){
            setNotes(response.notes);
        }
       
        // response.then(data => {
        //     console.log("getNotes response data = ", data);
        //     setNotes(data);
        // });
    }

    //Add a Note
    const addNote = async (title, description, tag) => {
        console.log("Adding a new note..");
        const url = `${host}/api/notes/addnote`;
        makeRestCall(url, {title, description, tag}, 'POST')
            .then(data => {
                console.log("add note response = ", data);
                if(data.savedNote){
                    let note = {
                        title,
                        description,
                        tag,
                        _id : data.savedNote._id
                    }
                    setNotes(notes.concat(note))
                }        
            });
    }

    //Delete a Note
    const deleteNote = (id) => {
        //TODO - delete api call
        console.log("Deleting the note with id: " + id);
        const url = `${host}/api/notes/deletenote/${id}`
        makeRestCall(url, {}, 'DELETE')
            .then(data => {
                console.log("delete response = ", data);

                let newNotes = notes.filter((note) => {
                    return note._id !== id;
                });
                setNotes(newNotes);
            });

        // let newNotes = notes.filter((note) => {
        //     return note._id !== id;
        // });
        // setNotes(newNotes);
    }

    //Edit a Note
    const editNote = async (id, title, description, tag) => {
        //API Call
        const url = `${host}/api/notes/updatenote/${id}`
        makeRestCall(url, {title, description, tag}, 'PUT')
            .then(data => {
                console.log("editnote response data = ", data);
                console.log("data note length = ", data.note.length);
                if(data.note){
                    //copy
                    let newNotes = JSON.parse(JSON.stringify(notes));

                    for (let index = 0; index < newNotes.length; index++) {
                        const element = newNotes[index];
                        //console.log("element = ", element);
                        if(element._id === id){
                            newNotes[index].title = title;
                            newNotes[index].description = description;
                            newNotes[index].tag = tag;
                            //console.log("notes here1-", newNotes[index]); 
                            break;
                        }  
                        //console.log("notes here-", notes); 
                    }
                    setNotes(newNotes);
                }
            });
    }
    
    return (
        <NoteContext.Provider value={{notes, getNotes, addNote, deleteNote, editNote}}>
            { props.children }
        </NoteContext.Provider>
    )
}

export default NoteState;