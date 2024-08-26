import { Link } from "react-router-dom"
import React  ,{useState} from 'react'
import './Join.css'
////manage state in function component and manages lifecycle method less coden improve readabity

const Join = () => {
  const [name,setName] = useState('')
  const [room,setRoom] = useState('')
//we can also passed the data through links sames as redux or props
  return (
    <div className="joinOuterContainer">
     <div className="joinInnerContainer">
      <h1 className="heading">Join to Chat</h1>
   <div><input placeholder="Name" required  className="joinInput" type ="text" onChange={(event)=>setName(event.target.value)} /></div>
   <div><input placeholder="Room Id" required  className="joinInput mt-20" type ="text" onChange={(event)=>setRoom(event.target.value)} /></div>
   <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
     </div>
    </div>
  )
}

export default Join
