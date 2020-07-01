import React, { Component } from "react";
import "./App.css";
import Messages from "./Messages";
import Input from "./Input";
import randomName from "./Components/RandomName";
import styled, { css } from "styled-components";
import hamburger from "./hamburger.png";
import back from "./back-arrow.png";
import avatar from "./blank-avatar.svg";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import ChannelList from "./Components/ChannelList";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function randomColor() {
  // return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  return "#6495ed";
}
const HoverButton = styled.p`
  :hover {
    cursor: pointer;
  }
`;

class General extends Component {
  state = {
    messages: [],
    member: {
      username: "",
      color: randomColor(),
    },
    viewMenu: false,
    viewMessages: true,
    currentChannel: "",
  };

  constructor(props) {
    console.log("constructing");
    super(props);
    this.drone = new window.Scaledrone("orrU5l6VPP3aRPzX", {
      data: this.state.member,
    });
    this.setState((state) => ({ username: this.props.name }));
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    const room = this.drone.subscribe(`observable-${this.props.channel}`, {
      historyCount: 6,
    });
    room.on("history_message", (message) => {
      const messages = this.state.messages;
      const data = message.data;
      const time = message.timestamp;
      messages.push([data, time]);
      this.setState({ messages });
    });
    room.on("data", (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });
      let scrollingElement = document.querySelector(
        "#root > div > div.main-content > div"
      );
      scrollingElement.scrollTop = scrollingElement.scrollHeight;
    });
  }
  handleClick = () => {
    const mesg = !this.state.viewMessages;
    this.setState((state) => ({ viewMessages: mesg }));
    const menu = !this.state.viewMenu;
    this.setState((state) => ({ viewMenu: menu }));
  };
  handleChannelChange = (channel) => {
    this.props.changeMasterChannel(channel);
    this.setState((state) => ({ currentChannel: channel }));
  };
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div onClick={this.handleClick}>
            <HoverButton hover>
              {this.state.viewMessages ? (
                <img className="hamburger" src={hamburger} />
              ) : (
                <img className="hamburger" src={back} />
              )}
            </HoverButton>
          </div>
          <span className="channel">{this.props.channel}</span>
          <div className="userinfo">
            <Link to="/user">
              <span className="username">
                {this.props.name != "newUser" ? this.props.name : "Sign In"}
              </span>
            </Link>
          </div>
        </div>
        <div className="main-content">
          <CSSTransition
            in={this.state.viewMenu}
            timeout={300}
            classNames="my-node"
            unmountOnExit
            onExited={() => this.showMessages}
            appear
          >
            <ChannelList username={this.props.name} handleChannelChange={this.handleChannelChange} />
          </CSSTransition>

          <div className="messages-wrapper">
            <Messages
              name={this.props.name}
              messages={this.state.messages}
              currentMember={this.state.member}
            />
          </div>
        </div>
        <Input
          name={this.props.name}
          currentMember={this.state.member}
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: `observable-${this.props.channel}`,
      message,
    });
  };
}

export default General;
