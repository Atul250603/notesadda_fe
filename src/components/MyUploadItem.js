import React, { useContext } from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import noteContext from "../context/notes/noteContext";
export default function MyUploadItem(props) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  let { note } = props;
  const context = useContext(noteContext);
  const{deletenote}=context;
  // console.log(note.filepath)
  return (
    <div className="card col-3 mx-3 my-2 border-warning">
      <div className="card-body">
        <h5 className="card-title medium-size">{note.topic}</h5>
        <p className="card-text medium-size">{note.category}</p>
        <div>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
            <Viewer
              fileUrl={note.fileContent}
            />
          </Worker>
        </div>
        <button className="btn btn-danger mt-3 medium-size" style={{width:"100%"}} onClick={()=>{deletenote(note._id)}}><strong>Delete Note</strong></button>
      </div>
    </div>
  );
}
