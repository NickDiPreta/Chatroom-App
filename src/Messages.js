import React, {useState} from "react";
import ConvertTimeStamp from "./Components/ConvertTimeStamp";
import Avatars from "./Components/Avatars";

function randomColor() {
  return "#" + (((1 << 24) * Math.random()) | 0).toString(16);
}

const Messages = (props) => {
  const [names, setNames] = useState([])
  let x = -1;
  const messages = props.messages;
  const makeMessage = (message) => {
    
    let time = ConvertTimeStamp(message[1]);
    if (message[0] != null) {
      let halfs = message[0].split(":");
      console.log(names)
      const copy = [...names]
      copy.indexOf(halfs[0]) < 0 ? x += 1 : setNames(halfs[0],[...copy])
      return (
        <li className="Messages-message">
          <span className="avatar">
            {Avatars[x]}
          </span>
          <div className="Message-content">
            <div className="username">{time}</div>
            <div className="text">
              <span className="bold">
                {halfs[0]}
                <br />
              </span>
              {halfs[1]}
            </div>
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
      let newText = text.replace(`${props.name} :`, "");
      return (
        <li className={className}>
          <span
            className="avatar"
            style={{ backgroundColor: member.color }}
          ></span>
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
