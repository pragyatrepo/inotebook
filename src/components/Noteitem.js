import React from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

function Noteitem(props) {
    const { note, openmodal } = props;//props destructuring
    const context = useContext(noteContext)
    const { deletenote } = context;

    return (
        <div className='col-md-3 my-3'>
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash mx-1" onClick={() => { deletenote(note._id) }}></i>
                    <i className="fa-regular fa-pen-to-square mx-1" onClick={() => { openmodal(note) }}></i>
                </div>
            </div>
        </div>

    )
}

export default Noteitem
