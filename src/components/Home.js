import React, { useContext, useEffect, useRef, useState } from "react";
import MyUploads from "./MyUploads";
import noteContext from '../context/notes/noteContext';
import Quote from "./Quote";
export default function Home() {
  const context = useContext(noteContext);
  const {addNote,getUser,getCoins}=context;
  const ref = useRef(null);
  const ref1 = useRef(null);
  const refClose = useRef(null);
  const [Notes, setNotes] = useState({
      topic:"",
      category:"",
      files:""
  });
  const [coin, setcoin] = useState();
  useEffect(async () => {
    setcoin(await getCoins());
  }, []);
  const uploadnotes = () => {
    ref.current.click();
  };
  const [quotes, setquotes] = useState([]);
  const [userName, setuserName] = useState(""); 
  useEffect(async() => {
    setuserName(await getUser());
    let response=await fetch("https://type.fit/api/quotes", {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let resp=await response.json();
    setquotes(resp);
  }, []);
  
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(Notes.files);
    addNote(Notes.topic,Notes.category,Notes.files);
    setNotes({
      topic:"",
      category:"",
      files:""
  });
  };
  const [error, seterror] = useState(null);
  const submitForm = () => {
    ref1.current.click();
    refClose.current.click();
    setcoin(coin+10);
  };
  const allowedFiles=['application/pdf'];
  const handleFile=(e)=>{
    let selectedFile=e.target.files[0];
    if(selectedFile){
      if(selectedFile&&allowedFiles.includes(selectedFile.type)){
        if(selectedFile.size<70000){
          seterror(null);
          let reader=new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onloadend=(e)=>{
          setNotes({...Notes,files:e.target.result})};
        }
        else{
            seterror("File Size Exceeded, File Size Should Be Under 70kb");
        }
        }
      else{
         
          seterror("Not a valid file type");
      }
    }
    else{
      seterror("Select a file");
      console.log("Select a file");
    }
  }
  return (
    userName!==""?<>
    {/* {quotes.length>0?<Quote quote={quotes[0]}/>:<></>} i need to add all the upload system in another component*/}
<div className="pt-3 mx-2 text-stylish">
      <div className="larger-size fw-bold">
        <div className="d-flex justify-content-between">
          <strong>
          Welcome, {userName} ...
          </strong>
          <div className="bg-warning px-2 rounded medium-size d-flex align-items-center">
            Your Coins:
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="currentColor"
              className="bi bi-coin"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z" />
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
            </svg>{" "}
            {coin}
          </div>          
        </div>
        {/* {quotes.length>0?<div>
        {quotes[0].text}
        </div>:<></>} */}
        <div>
          <strong className="large-size py-4">
          Upload Notes 
          </strong>
        <button
          className="mx-3 btn btn-sm btn-warning"
          onClick={uploadnotes}
        >
          <i className="fas fa-upload"></i>
        </button>
      </div>
      </div>
      <div>
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        >
          Launch demo modal
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Upload Notes
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={submitHandler}>
                  <div className="mb-3">
                    <label htmlFor="topic" className="form-label">
                      Topic
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="topic" name="topic"
                      aria-describedby="emailHelp"
                      required onChange={(e)=>{setNotes({...Notes,[e.target.name]:e.target.value})}} value={Notes.topic}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="category" name="category"
                      aria-describedby="emailHelp"
                      required onChange={(e)=>{setNotes({...Notes,[e.target.name]:e.target.value})}} value={Notes.category}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="file" className="form-label">
                      File
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="file" name="files"
                      aria-describedby="emailHelp"
                      required onChange={handleFile}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary d-none"
                    ref={ref1}
                  >
                    Submit
                  </button>
                </form>
                {error?<div className="text-danger fw-bold medium-size">{error}</div>:<></>}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className={`btn btn-warning ${error?"disabled":""}`}
                  onClick={submitForm}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-3">
        <h5 className="large-size">Past Uploads</h5>
        <MyUploads/>
      </div>
    </div></>:<></>
  );
}
