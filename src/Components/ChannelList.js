import React, { useState } from "react";
import styled, { css } from "styled-components";
import Popup from "./Popup";

const MenuHover = styled.li`
  :hover {
    cursor: pointer;
    background-color: rgb(248, 125, 104);
    transition: 0.5s;
  }
`;

const ChannelList = (props) => {
  const [tempName, setTempName] = useState("");

  const [dms, newDm] = useStickyState(
    ["Jenny", "Malik", "Austin", "Aaliyah"],
    []
  );

  function useStickyState(defaultValue, key) {
    const [value, setValue] = React.useState(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    });
    React.useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
  }

  const allChannels = ["General", "Tech-talk", "Party-time", "Accomplishments"];
  const teamChannels = allChannels.map((e) => {
    return (
      <MenuHover onClick={() => props.handleChannelChange(e)}>{e}</MenuHover>
    );
  });

  const hide = props.username;
  const directMessages = dms.map((d) => {
    if (hide < d) {
      return (
        <MenuHover onClick={() => props.handleChannelChange(`${d}-${hide}`)}>
          {d}
        </MenuHover>
      );
    } else {
      return (
        <MenuHover onClick={() => props.handleChannelChange(`${hide}-${d}`)}>
          {d}
        </MenuHover>
      );
    }
  });

  const createChannel = () => {
    props.togglePopup(!props.popup);
  };
  const handleSub = (event) => {
    event.preventDefault();
    let copy = [...dms];
    copy.push(tempName);
    newDm(copy);
  };
  const handleNewChannel = (event) => {
    setTempName(event.target.value);
  };
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
        <div className="plus">
          <div className="spacer"></div>
          <h4>Direct Messages</h4>
          <div onClick={createChannel}>
            <img id="plus-symbol" src="https://i.imgur.com/LgkCYY2.png" />
          </div>
        </div>
        {props.popup ? (
          <Popup
            submit={handleSub}
            tempName={tempName}
            setTempName={setTempName}
            handleNewChannel={handleNewChannel}
          />
        ) : (
          ""
        )}
        <ul className="menulist">{directMessages}</ul>
      </div>
    </div>
  );
};

export default ChannelList;
