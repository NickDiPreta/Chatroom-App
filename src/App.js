import React, { Component } from "react";
import "./App.css";
import Messages from "./Messages";
import Input from "./Input";
import randomName from "./Components/RandomName";
import styled, { css } from "styled-components";
import hamburger from "./hamburger.png"
import avatar from "./blank-avatar.svg"
// const myStyles = {
//   backgroundColor: "pink",
// };

// const MyWrapper = styled.div`
//   display:flex;
//   color: black;
//   font-size: 1.5em;
//   align-items:center;
//   justify-content: space-around;
//   align-content: center;
//   height:100%;
//   ${(props) =>
//     props.border
//       ? css`
//           border:none;
//         `
//       : ""}
// `;

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
    },
  };

  constructor() {
    console.log("constructing");
    super();
    this.drone = new window.Scaledrone("orrU5l6VPP3aRPzX", {
      data: this.state.member,
    });
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    const room = this.drone.subscribe("observable-room", {
      historyCount: 5,
    });
    room.on("history_message", (message) => {
      const messages = this.state.messages;
      const data = message.data;
      const time = message.timestamp;
      messages.push([data,time]);
      this.setState({ messages });
    });
    room.on("data", (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data});
      this.setState({ messages });
      let scrollingElement = document.querySelector("#root > div > div.messages-wrapper")
      scrollingElement.scrollTop = scrollingElement.scrollHeight;
    });

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          
            <img className="hamburger"src={hamburger}/>
            <span className="channel">Nick's Lounge</span>
            <img className="user-profile"src={avatar}/>
          
        </div>
        <div className="messages-wrapper">
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <div className="empty"></div>
        </div>
        <Input currentMember={this.state.member} onSendMessage={this.onSendMessage} />
      </div>
    );
  }
  
  onSendMessage = (message) => {
    
    this.drone.publish({
      room: "observable-room",
      message,
    });

  };
}

export default App;
