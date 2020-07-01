import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import styled, { css } from "styled-components";
const NewUser = (props) => {
  const HoverButton = styled.button`
    :hover {
      cursor: pointer;
    }
  `;
  return (
    <div className="NewUser">
      <div className="userhead">
        <h1>Enter User Information</h1>
      </div>
      <Link to="/Chatroom-App/">
        <HoverButton>Back</HoverButton>
      </Link>
      <p>Username: {props.name}</p>

      <form className="user-form" onSubmit={props.onSub}>
        <input
          type="text"
          value={props.temp}
          placeholder="Your name here"
          onChange={props.handleChange}
          id="name"
        />

        <input type="submit" />
      </form>
    </div>
  );
};

export default NewUser;
