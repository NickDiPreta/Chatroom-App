import React from "react";
function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}
const Messages = (props) => {
  const messages = props.messages;

  const makeMessage = (message) => {
    if (typeof message == "string") {
      return (
        <li className='Messages-message'>
          <span className="avatar" style={{backgroundColor:randomColor()}}/>
          <div className="Message-content">
          <div className="username">anonymous</div>
          <div className="text">{message}</div>
          </div>
        </li>
      )
    } else {
      const { member, text } = message;
      console.log(member);
      const messageFromMe = member.id === props.currentMember.id;
      const className = messageFromMe
        ? "Messages-message currentMember"
        : "Messages-message";
      const username = member.username
        ? member.username
        : member.clientData.username;
      return (
        <li className={className}>
          <span className="avatar" style={{ backgroundColor: member.color }} />
          <div className="Message-content">
            <div className="username">{username}</div>
            <div className="text">{text}</div>
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
