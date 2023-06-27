import React,{useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import PublicItem from './PublicItem';
export default function Public() {
const context=useContext(noteContext);
const {PublicNotes,fetchallnotes,getCoins}=context;
const [coin, setcoin] = useState();
const navigate=useNavigate();
useEffect(async() => {
  if(localStorage.getItem('token')){
    setcoin(await getCoins());
    fetchallnotes();
    
  }
  else{
    navigate('/login');
  }
}, []);

  return(
      <>
      <h3 className='mx-2 mt-2 text-stylish large-size'>All Public Notes</h3>
      {coin<=0?<h4 className='text-danger text-stylish medium-size text-center'>Insufficient Coins</h4>:<></>}
      <div className='row my-3 text-center justify-content-center text-stylish' style={{width:"99vw"}}>
      {PublicNotes.map((note,index)=>{
          return <PublicItem note={note} coin={coin} key={index}/>
      })}
      </div>
      </>
  );
}
