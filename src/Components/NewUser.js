import React, { useState } from "react";

const NewUser = (props) => {
  
  return (
    <div className="NewUser">
      <h1>User</h1>
      <p>Current name: {props.name}</p>
      
      <form onSubmit={() => props.setName(props.name)}>
      
      <input type="text" value={props.name} onChange={props.handleChange} id="name" />

      <input type="submit" />
    </form>
    </div>
  );
}

export default NewUser;
