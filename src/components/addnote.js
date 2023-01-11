import React from 'react'
import { useContext,useState } from 'react';
import noteContext from '../context/notes/noteContext';

const Addnote = () => {
    const context = useContext(noteContext)
    const { addnote} = context;
    const[note,setNote]=useState({title:"",description:"",tag:""})
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleclick=(e)=>{
        e.preventDefault();
        addnote(note.title,note.description,note.tag);
        //empty input after note added
        setNote({title:"",description:"",tag:""})
    }
    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title"  value={note.title} onChange={onChange}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="desc" name="description"value={note.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
                </div>
                <button disabled={note.title.length<3||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add notes</button>
            </form>
        </div>
    )
}

export default Addnote
