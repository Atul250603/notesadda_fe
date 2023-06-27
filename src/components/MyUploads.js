import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import MyUploadItem from './MyUploadItem';
export default function MyUploads() {
    const context=useContext(noteContext);
    const navigate=useNavigate();
    const {Notes,fetchmynotes}=context;
    useEffect(() => {
      if(localStorage.getItem('token')){
        fetchmynotes();
      }
      else{
        navigate('/login');
      }
    }, []);
    
  return(
          Notes.length===0?<div className='text-danger text-center'> No Past Uploads Yet...</div>:<div className='row my-3 text-center justify-content-center' style={{width:"99vw"}}>
            {(Notes)?Notes.map((note,index)=>{
                return <MyUploadItem note={note} key={index}/>
            }):<></>}
        </div>
          
        
  );
}
