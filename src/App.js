import logo from './logo.svg';
import './App.css';
import {io} from "socket.io-client";
import QRCode from "react-qr-code";
import {useEffect, useState} from "react";
const socket=io.connect("https://apis.shristeeanimaax.com",{});
//const socket=io.connect("http://136.185.2.191",{});
let _myNumbers = ["919361623664","919486653693"];
//http://192.168.1.10:3000/
function App() {
    let number="919361623664";
    let message="Hello Its TestMessage";
    let urlDoc="https://visionmaya.com/SAAAS.pdf";
  const [session,setSession]=useState("");
  const [qrCode,setQRCode]=useState("");
  const [oldSessionId,setoldSessionId]=useState("");
    const [logMessage,setlogMessage]=useState("Empty");
   const createSessionForWhatsapp=()=>
  {
      socket.emit("createSession",{
          id:session,
      });
  }
    const [id,setID]=useState("");
  useEffect(()=>
{
  socket.emit("Connected","Hello From Client")
    socket.on('message', (data)=> {
        const {message}=data;
        setlogMessage(message)
        //console.log(data)
    });
    socket.on('sessionCreated', (data)=> {
        const {message}=data;
        setlogMessage(message)
        //console.log(data)
    });
    socket.on("qr",(data)=>
    {
        const {qr,message}=data;
        console.log("QR CODE RECEIVED",qr)
        setQRCode(qr)
        setlogMessage("QR CODE RECEIVED")
    });
    socket.on("ready",(data)=>
    {
        const {id,message}=data;
        console.log("Ready",data)
        setID(id)
        setlogMessage(message)

    });
    socket.on("remote_session_saved",(data)=>
    {
        const {message}=data;
        console.log("remote_session_saved",message)

        setlogMessage(message)

    });
    socket.on("allChats",(data)=>
    {
        //const {id}=data;
        console.log("allChats",data)
        //setID(id)

    });
    socket.on("sendMessageSuccess",(data)=>
    {
        //const {id}=data;
        console.log("sendMessageSuccess",data)
        //setID(id)

    });
},[]);
   const  getAllChats=()=>{
     socket.emit("getAllChats",{id});
   };
    const  SendMessage=()=>{
        socket.emit("sendMessage",{id:id,number:number,message:id,mediaPath:urlDoc});
    };
    const getOldSession=()=>
    {
        socket.emit("getSession",{id:oldSessionId});

    };
    const foldercreate=()=>
    {
        socket.emit("connected",{id:"siva"});

    };
  return (
    <div className="App">
<h1>My Whatsapp</h1>
        <div style={{marginBottom:"40px"}}>
            <input type="text" value={oldSessionId} onChange={(e)=>{
                setoldSessionId(e.target.value)
            }}/>

            <button onClick={getOldSession}>Get Old Session</button>

        </div>
        <div style={{marginBottom:"40px"}}>


            <button onClick={foldercreate}>Check Connection</button>

        </div>
          <div style={{marginBottom:"40px"}}>
              <input type="text" value={session} onChange={(e)=>{
                  setSession(e.target.value)
              }}/>

              <button onClick={createSessionForWhatsapp}>Create New Session</button>

          </div>
        <div style={
            {marginBottom:"24px"}
        }>
            <h1>{logMessage}</h1>
            {/*{id!==""&&<button onClick={getAllChats}>SendMessage</button>}*/}

        </div>
          <div style={
              {marginBottom:"24px"}
          }>
              {id!==""&&<button onClick={getAllChats}>getAllChats</button>}
              {/*{id!==""&&<button onClick={getAllChats}>SendMessage</button>}*/}

          </div>
        <div style={
            {marginBottom:"24px"}
        }>
            {id!==""&&<button onClick={SendMessage}>SendMessage</button>}

        </div>
        <QRCode value={qrCode}></QRCode>
    </div>
  );
}

export default App;
