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

  return (
    <div className="menu">
      <div className="channels-head">
        <h3>Channels</h3>
      </div>
      <div className="team-chat">
        <h4>Team Chat</h4>
        {teamChannels}
        <ul className="menulist"></ul>
      </div>

      <div className="direct-messages">
        <h4>Direct Messages</h4>
        <ul className="menulist">
          <MenuHover>Jenny</MenuHover>
          <MenuHover>Malik</MenuHover>
          <MenuHover>Austin</MenuHover>
          <MenuHover>Aaliyah</MenuHover>
        </ul>
      </div>
    </div>
  );
};

export default ChannelList;
