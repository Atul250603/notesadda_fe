import React,{useContext, useState,useEffect} from 'react';
import noteContext from '../context/notes/noteContext';
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useNavigate, useParams } from 'react-router-dom';
import e from 'cors';
export default function Download(){
    const context=useContext(noteContext);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const {downloadnote,download}=context;
    const [note, setnote] = useState([]);
    let params=useParams();
    useEffect(async() => {
      setnote(await downloadnote(params.id));
    }, []);
    // useEffect(() => {
    //   setnote(PublicNotes.find((element)=>{
    //     return element._id===params.id;
    //   }));
    // }, []);
    // console.log(note);
    return(
    note.length>0?
    <div className='my-3 mx-2 large-size text-stylish'>
      <h3>Click on the download symbol to start downloading</h3>
    <div className="d-flex justify-content-center">
      <div className="col-6 my-2 justify-content-center">
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
      <Viewer id="viewer"
        fileUrl={note[0].fileContent} plugins={[defaultLayoutPluginInstance]}
      />
    </Worker>
  </div>
    </div>
    </div>:<></>
  
    
  );
}
