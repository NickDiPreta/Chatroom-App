import React from "react";
import styled, { css } from "styled-components";

const MenuHover = styled.li`
  :hover {
    cursor: pointer;
    background-color:rgb(248, 125, 104);
    transition: 0.5s;
  }
`;

const ChannelList = (props) => {
  return (
    <div className="menu">
      <div className="channels-head">
        <h3>Channels</h3>
      </div>
      <div className="team-chat">
        <h4>Team Chat</h4>

        <ul className="menulist">
          <MenuHover>General</MenuHover>
          <MenuHover>Tech talk</MenuHover>
          <MenuHover>Party time</MenuHover>
          <MenuHover>Accomplishments</MenuHover>
        </ul>
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
