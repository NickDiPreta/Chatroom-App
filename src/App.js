import React, { Component, useState } from "react";
import "./App.css";
import styled, { css } from "styled-components";
import General from "./General";




const App = () => {
  const [channel, changeChannel] = useState("General");
  const changeMasterChannel = (chan) => {
    changeChannel(chan);
  };
  return (
    <>
      <General
        channel={channel}
        changeMasterChannel={changeMasterChannel}
        key={channel}
      />
    </>
  );
};

export default App;
