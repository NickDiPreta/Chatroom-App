import React, { Component } from "react";
import "./App.css";
import Messages from "./Messages";
import Input from "./Input";
import randomName from "./Components/RandomName";
import styled, { css } from "styled-components";

const myStyles = {
  backgroundColor: "pink",
};

const MyWrapper = styled.div`
  color: white;

  ${(props) =>
    props.border
      ? css`
          border: 2px solid black;
        `
      : ""}
`;

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
    });

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <MyWrapper border>
            <h1>Nick's Lounge</h1>
          </MyWrapper>
        </div>

        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
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
