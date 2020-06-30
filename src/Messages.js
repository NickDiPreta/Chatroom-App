import React from "react";
import ConvertTimeStamp from "./Components/ConvertTimeStamp";

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}
const Messages = (props) => {
  const messages = props.messages;

  const makeMessage = (message) => {
    console.log(message);
    let time = ConvertTimeStamp(message[1]);
    if (message[0] != null) {
      let halfs = message[0].split(":")
      return (
        <li className="Messages-message">
          <span className="avatar" style={{ backgroundColor: randomColor() }} />
          
          <div className="Message-content">
          <div className="username">{time}</div>
            <div className="text"><span className="bold">{halfs[0]}</span>{":" + halfs[1]}</div>
          </div>
        </li>
      );
    } else {
      const { member, text } = message;

      const messageFromMe = member.id === props.currentMember.id;
      const className = messageFromMe
        ? "Messages-message currentMember"
        : "Messages-message";
      const username = member.clientData.username;
      let newText = text.replace(`${username} :`,"")
      return (
        <li className={className}>
          <span className="avatar" style={{ backgroundColor: member.color }} />
          <div className="Message-content">
            <div className="username">{username}</div>
            <div className="text">{newText}</div>
          </div>
        </li>
      );
    }
  };

  return (
    <ul className="Messages-List">{messages.map((m) => makeMessage(m))}</ul>
  );
};

export default Messages;
