import { useState } from "react";
import NoteContext from "../context/notes/noteContext";
//import AlertContext from "./alertContext";
const NoteState = (props) => {
    const host = "http://localhost:5000"
    // const [Alert,setAlert]=useState(null)
    // const showalert=(message,type)=>{
    //     setAlert({msg:message,type:type
    //     })
    //     setTimeout(()=>{
    //         setAlert(null)
    //     },1500)
    // }
    const [Notes, setNotes] = useState([])


    //fetch all notes
    const getnote = async() => {
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhZGJjZTgzOTg5N2IxYWQzOWE3NTY0In0sImlhdCI6MTY3MjMzMDkxMH0.f49DCjF_zkM9er4NEq2bdpV7jAPXrcamQogrjFgJ2iQ'
            }
        });
        const json=await response.json();
    setNotes(json)
    }


    //add a note
    const addnote = async(title, description,tag) => {
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhZGJjZTgzOTg5N2IxYWQzOWE3NTY0In0sImlhdCI6MTY3MjMzMDkxMH0.f49DCjF_zkM9er4NEq2bdpV7jAPXrcamQogrjFgJ2iQ'
            },

            body: JSON.stringify({title,description,tag}) 
        });
        const json = await response.json();
        //updating with note added
        setNotes(Notes.concat(json))
    }


    //delete a note
    const deletenote = async(id) => {
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhZGJjZTgzOTg5N2IxYWQzOWE3NTY0In0sImlhdCI6MTY3MjMzMDkxMH0.f49DCjF_zkM9er4NEq2bdpV7jAPXrcamQogrjFgJ2iQ'
            }
            
        });
      getnote();
        
    }


    //edit a note
    const editnote = async (id, title, description, tag) => {
        //api call
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhZGJjZTgzOTg5N2IxYWQzOWE3NTY0In0sImlhdCI6MTY3MjMzMDkxMH0.f49DCjF_zkM9er4NEq2bdpV7jAPXrcamQogrjFgJ2iQ'
            },

            body: JSON.stringify({title,description,tag}) // 
        });
        const json = response.json();

        let newnotes=JSON.parse(JSON.stringify(Notes))
        //logic to edit in client
        for (let index = 0; index < newnotes.length; index++) {
            const element = newnotes[index];
            if (element._id === id) {
                newnotes[index].title = title;
                newnotes[index].description = description;
                newnotes[index].tag = tag;
                break;
            }

        }
        setNotes(newnotes);
    }
    return (
        
        <NoteContext.Provider value={{ Notes, addnote, deletenote, editnote,getnote }}>
        {props.children}
        </NoteContext.Provider>
        
            
        
        
    )
}
export default NoteState