import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Download from "./components/Download";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Public from "./components/Public";
import Signup from "./components/Signup";
import NoteState from "./context/notes/NoteState";
function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/public" element={<Public />} />
            <Route exact path="/download/:id" element={<Download />} /> 
            <Route exact path="/login" element={<Login />} /> 
            <Route exact path="/signup" element={<Signup />} /> 
            {/* i need to make a backend api which will return only the note whose id is passed in the url */}
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
