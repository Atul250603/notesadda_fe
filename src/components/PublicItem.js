import React,{useContext, useEffect, useState,useRef} from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Link, useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
export default function PublicItem(props) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  let { note,coin } = props;
  const context=useContext(noteContext);
  const navigate=useNavigate();
  const{downloadnote}=context;
  const ref = useRef(null);
  const refClose = useRef(null);
  return (
    <>
    <div className="card col-3 mx-3 my-2 border-warning">
      <div className="card-body">
        <h5 className="card-title medium-size">{note.topic}</h5>
        <p className="card-text medium-size">{note.category}</p>
        <div>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
            <Viewer id="viewer"
              fileUrl={note.fileContent}
            />
          </Worker>
        </div>
        <button className={`btn btn-warning btn-lg mt-3 medium-size ${coin<=0?"disabled":""}`} style={{width:"100%"}} onClick={()=>{ref.current.click();}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-coin" viewBox="0 0 16 16">
  <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
</svg> 10</button>
      </div>
    </div>
<button type="button" class="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        Click next to confirm the purchase
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={()=>{ refClose.current.click();navigate(`/download/${note._id}`);}}>Next</button>
      </div>
    </div>
  </div>
</div>
    </>
  );
}
