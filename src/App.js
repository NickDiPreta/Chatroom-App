import React, { Component, useState } from "react";
import "./App.css";
import styled, { css } from "styled-components";
import General from "./General";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import NewUser from "./Components/NewUser"




const App = () => {
  const [channel, changeChannel] = useState("General");
  const changeMasterChannel = (chan) => {
    changeChannel(chan);
  };

  const [name, setName] = useStickyState("newUser", "count");
  

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
  const handleChange = (event) => {
    setName(event.target.value);
  };



  return (
    <>
    <Switch>
      <Route path="/Chatroom-App" exact render={(props)=>(<General
        channel={channel}
        changeMasterChannel={changeMasterChannel}
        key={channel}
        name={name}
      />
      )}
      />
      <Route path="/user" render={(props)=>(<NewUser handleChange={handleChange} name={name} setName={setName}/> )} />
      </Switch>
    </>
  );
};

export default App;
