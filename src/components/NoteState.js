import { useState } from "react";
import AlertContext from "../context/notes/alertContext";
import { useContext } from "react";
import NoteContext from "../context/notes/noteContext";
//import AlertContext from "./alertContext";
const NoteState = (props) => {
    const alert1=useContext(AlertContext)
    const {setMsg}=alert1
    const host = "http://localhost:5000"
    const [Alert, setAlert] = useState(null)
    const showalert = (message, type) => {
        setAlert({
            msg: message, type: type
        })
        setTimeout(() => {
            setAlert(null)
        }, 1500)
    }
    const [Notes, setNotes] = useState([])


    //fetch all notes
    const getnote = async () => {
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json)
    }


    //add a note
    const addnote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },

            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        setMsg("note added","success")
        //updating with note added
        setNotes(Notes.concat(json))
    }


    //delete a note
    const deletenote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }

        });
        setMsg("note deleted","success")
        getnote();


    }


    //edit a note
    const editnote = async (id, title, description, tag) => {
        //api call
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
                       },

            body: JSON.stringify({ title, description, tag }) // 
        });
        const json = response.json();

        let newnotes = JSON.parse(JSON.stringify(Notes))
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
        setMsg("note updated ","success")
        setNotes(newnotes);
    }
    return (
        <>
            <NoteContext.Provider value={{ Notes, addnote, deletenote, editnote, getnote }}>
                
                    {props.children}
                
            </NoteContext.Provider>
        </>



    )
}
export default NoteState