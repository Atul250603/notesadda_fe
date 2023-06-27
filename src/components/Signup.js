import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate=useNavigate();
    const [credentials, setcredentials] = useState({
        name:"",
        email:"",
        password:""
    });
    const submit=async(e)=>{
        e.preventDefault();
        const response = await fetch("https://notesadda.onrender.com/auth/createuser", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}) // body data type must match "Content-Type" header
          });
          const resp=await response.json();
          localStorage.setItem('token',resp.token);
          navigate('/login');
    }
  return(
      <div className="container my-4 text-stylish medium-size">
          <form onSubmit={submit}>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" required   value={credentials.name} onChange={(e)=>{setcredentials({...credentials,[e.target.name]:e.target.value})}}/>
    </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email address</label>
      <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" required  value={credentials.email}  onChange={(e)=>{setcredentials({...credentials,[e.target.name]:e.target.value})}}/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" id="password" name="password" required minLength={5} value={credentials.password}  onChange={(e)=>{setcredentials({...credentials,[e.target.name]:e.target.value})}}/>
    </div>
    <button type="submit" className="btn btn-warning"><strong className='medium-size'>Signup</strong></button>
  </form>
      </div>
  );
}
