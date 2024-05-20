import { useState,useEffect } from 'react'
import './App.css'
import {nanoid} from "nanoid"
import io from "socket.io-client"

const socket = io.connect("http://localhost:3000")
const userName= nanoid(4)
function App() {
  const [message, setmessege] = useState("")
  const [chat,setchat] = useState([])

  const sendChat = (e)=>{
    e.preventDefault()
    socket.emit("chat",{message,userName})
    setmessege("")
  }

  useEffect(()=>{
    socket.on("chat",(payload)=>{
      setchat([...chat,payload])
    })
  })

  return (
    <>
      
       
      <h1>Realtime Chat</h1>
      {chat.map((payload,index)=>{
        return(
          <p key={index}>{payload.message} : id:{payload.userName}</p>
        )
      })}
      <form onSubmit={sendChat} >
        <input type="text" name="" placeholder='enter your messege' value={message}
        onChange={(e)=>setmessege(e.target.value)} />
        <button type='submit'>Send</button>
      </form>
      
      
    </>
  )
}

export default App
