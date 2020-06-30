import React, {useState} from "react"


const Input = (props) =>{
  const [text, setText] = useState("")

  const onChange = (e) =>{
    setText(e.target.value)
  }

  const onSubmit = (e)=> {
    e.preventDefault();
    props.onSendMessage(text)
    setText("")
  }


  return ( 
    <div className="Input">
      <form onSubmit={e => onSubmit(e)}>
        <input onChange={e=> onChange(e)}
        value={text}
        type="text"
        placeholder="Enter your message and press ENTER"
        autofocus="true" />
        <button>Send</button>
      </form>
    </div>
  )
}


export default Input