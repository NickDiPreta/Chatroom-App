import React from "react";

const Popup = (props) => {
  return (
    <div className="popup">
      <form onSubmit={props.submit} id="newChannelForm">
        <input type="text" value={props.tempName} onChange={props.handleNewChannel} placeholder="Name"></input>
      </form>
    </div>
  );
};

export default Popup;
