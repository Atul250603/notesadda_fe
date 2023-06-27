import React, { useEffect, useRef,useState } from 'react';
export default function Quote(props) {
    const refQuote = useRef(null);
    const [quote, setquote] = useState({
        quote:{}
    });
    useEffect(() => {
        setquote({quote:props.quote});
        refQuote.current.click();
    }, []);
  return(<><button type="button" className="btn btn-primary d-none" data-bs-toggle="modal"  ref={refQuote} data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" >
    <div className="modal-content bg-dark" style={{border:"2px solid gold"}}>
      <div className="modal-header text-center">
        <h5 className="modal-title  text-stylish text-warning large-size" id="exampleModalLabel">Quote Of The Day</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      {quote.quote?<div className="modal-body text-warning text-stylish medium-size">
        <div>&#34; {quote.quote.text} &#34;</div>
        <div className="text-end">- {quote.quote.author}</div>
      </div>:<></>}
    </div>
  </div>
</div></>);
}
