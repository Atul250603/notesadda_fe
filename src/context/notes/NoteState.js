import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState=(props)=>{
    const [Notes, setNotes] = useState([]);
    const [PublicNotes, setPublicNotes] = useState([]);
    const [download, setdownload] = useState([]);
    const fetchmynotes=async()=>{
      const response = await fetch("https://notesadda.onrender.com/file/fetchmyfiles", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
         'authToken':localStorage.getItem('token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer'
      });
      setNotes(await response.json());
    }
    const fetchallnotes=async()=>{
      const response = await fetch("https://notesadda.onrender.com/file/fetchallfiles", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer'
      });
      setPublicNotes(await response.json());
    }
    const downloadnote=async(id)=>{
      const response = await fetch(`https://notesadda.onrender.com/file/download/${id}`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'authToken':localStorage.getItem('token')
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer'
      });
      let resp=await response.json();
      let temparr=[];
      temparr.push(resp);
      return temparr;
    }
    const addNote=async(topic,category,fileContent)=>{
      const response = await fetch("https://notesadda.onrender.com/file/addfile", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          'authToken':localStorage.getItem('token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({topic,category,fileContent}) // body data type must match "Content-Type" header
      });
      const resp=await response.json();
      let tempnote=[...Notes];
      let tempnote1=[...PublicNotes];
      tempnote.push(resp);
      tempnote1.push(resp);
      setNotes(tempnote);
      setPublicNotes(tempnote1);
    }
    const deletenote=async(id)=>{
      const response = await fetch(`https://notesadda.onrender.com/file/deletefile/${id}`, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'authToken':localStorage.getItem('token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer'
      });
      let tempnote=[...Notes];
      let tempnote1=[...PublicNotes];
      let index=tempnote.findIndex((element)=>{
        return element._id===id;
      })
      let index1=tempnote1.findIndex((element)=>{
        return element._id===id;
      })
      tempnote.splice(index,1);
      tempnote1.splice(index1,1);
      setNotes(tempnote);
      setPublicNotes(tempnote1);
    }
    const getUser=async()=>{
      const response = await fetch("https://notesadda.onrender.com/auth/getuser", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'authToken':localStorage.getItem('token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer'
      });
      let resp=await response.json();
      return resp.name;
    }
    const getCoins=async()=>{
      const response = await fetch("https://notesadda.onrender.com/auth/getuser", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'authToken':localStorage.getItem('token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer'
      });
      let resp=await response.json();
      return resp.coins;
    }
    return(
        <NoteContext.Provider value={{Notes,PublicNotes,fetchmynotes,fetchallnotes,download,downloadnote,addNote,deletenote,getUser,getCoins}}>
            {props.children}
        </NoteContext.Provider>
    )
  };
  export default NoteState;

  //using multer storing the file in the local directory and then on the request coverting the pdf to the bytes which we will be using for the display