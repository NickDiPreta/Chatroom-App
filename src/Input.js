import React, {useState} from "react";
import styled, { css } from "styled-components";


const ButtonHover = styled.button`
  :hover {
    cursor: pointer;
    background-color: rgb(248, 125, 104);
    transition: 0.5s;
  }
`;
const Input = (props) =>{
  const [text, setText] = useState("")

  const onChange = (e) =>{
    setText(e.target.value)
  }

  const onSubmit = (e)=> {
    e.preventDefault();
    let uName = props.name
    props.onSendMessage(uName+ " : "+text)
    setText("")
  }


  return ( 
    <div className="Input">
      <form onSubmit={e => onSubmit(e)}>
        <input onChange={e=> onChange(e)}
        value={text}
        type="text"
        placeholder="Message"
         />
        <ButtonHover>Send</ButtonHover>
      </form>
    </div>
  )
}


export default Input