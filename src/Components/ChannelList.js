import React from "react";
import styled, { css } from "styled-components";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import App from "../App";

const MenuHover = styled.li`
  :hover {
    cursor: pointer;
    background-color: rgb(248, 125, 104);
    transition: 0.5s;
  }
`;

const ChannelList = (props) => {
  const allChannels = ["General", "Tech-talk", "Party-time", "Accomplishments"];
  const teamChannels = allChannels.map((e) => {
    return (
      <MenuHover onClick={() => props.handleChannelChange(e)}>{e}</MenuHover>
    );
  });
  const dms = ["Jenny", "Malik", "Austin", "Aaliyah"];
  const hide = props.username
  const directMessages = dms.map((d) => {
    if (hide < d){
    return (
      <MenuHover onClick={() => props.handleChannelChange(`${d}-${hide}`)}>{d}</MenuHover>
    )}
    else{
      return (
        <MenuHover onClick={() => props.handleChannelChange(`${hide}-${d}`)}>{d}</MenuHover>
      )};
  });
  return (
    <div className="menu">
      <div className="channels-head">
        <h3>Channels</h3>
      </div>
      <div className="team-chat">
        <h4>Team Chat</h4>

        <ul className="menulist">{teamChannels}</ul>
      </div>

      <div className="direct-messages">
        <h4>Direct Messages</h4>
        <ul className="menulist">{directMessages}</ul>
      </div>
    </div>
  );
};

export default ChannelList;
