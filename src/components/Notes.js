import noteContext from '../context/notes/noteContext';
import { useContext, useEffect, useRef ,useState} from 'react';
import { useNavigate  } from 'react-router';
import Noteitem from './Noteitem';
import Addnote from './addnote';

function Notes() {
    const ref = useRef(null);
    const ref1 = useRef(null);
    let history = useNavigate();
    const context = useContext(noteContext)
    const { Notes, getnote,editnote } = context;
    const[note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleclick=(e)=>{
        editnote(note.id,note.etitle,note.edescription,note.etag)
        ref1.current.click();
       
    }
    const openmodal = (currentnote) => {
        ref.current.click();
        setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
    }

    

    useEffect(() => {
        if(localStorage.getItem('token')){

            getnote()
        }
        else{
            history("/login")
        }
    }, [])
    return (
        <>
            <Addnote />
            {/* modal begins here */}
            <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ "display": "none" }}>
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="desc" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                                
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={ref1} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<3||note.edescription.length<5}type="button" className="btn btn-primary" onClick={handleclick}>Update notes</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* iterating to all notes and passing them to note item */}
            <div className="row my-3">
                {Notes.length===0&&"No notes to display"}
                {Notes.map((note) => {
                    return <Noteitem key={note._id} openmodal={openmodal} note={note} />
                })}
            </div>

        </>
    )
}

export default Notes
