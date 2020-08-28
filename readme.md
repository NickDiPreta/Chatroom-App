Overview

[Link to my Chatroom Application](https://nickdipreta.github.io/Chatroom-App/)

Project Description: nChat is a chatroom application built using React and an API called Scaledrone(https://www.scaledrone.com/docs/api-clients/javascript). This chatroom will update in real time and can have up to 10 concurrent users. It utilizes websockets to achieve much of its functionality.

### Planning

![Screenshot of channel](https://i.imgur.com/BkChYhl.png)
-------
Wireframe including component outlines:
![Wireframe including component outlines](https://cdn-media-1.freecodecamp.org/images/1*SUeSr13iO7yJfIf4ipaeFg.png)
![Mobile Wireframes](https://imgur.com/EAiGeG7)
![React Architecture](https://i.imgur.com/EAiGeG7.png)



### MVP/PostMVP

- Allow user to type in messages that will populate chatroom
- Use Scaledrone's API to handle message sending
- Present realtime message updates in chatroom to all users
- Multiple channels

### PostMVP
- Allow images and gifs to be sent
- Remember users / user log in 

| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Chatroom Skeleton | H | 6hrs| - | 4hrs |
| API message handling | H | 15hrs| - | 10hrs |
| Guest Log In Through API | H | 5hrs| - | 3hrs |
| Associating messages with users and updating in chat | H | 5hrs| - | 3hrs |
| UI design | H | 10hrs| - | 8hrs |
| Local Storage | M | 4hrs | - | 3hrs|
| Direct messaging | L | 4 hrs | - | 3 hrs|
| Multiple Channels | H | 5 hrs | - | 3hrs |
| User can create DM | L | 2hrs | - | 4hrs |
| Total | H | 40hrs| - | 41hrs |

### Additional Libraries
1. Styled-components
2. React Router
3. React-Transition-Group


### Component Sample
Below is the component that is used to create the menu that the user can click on to change channels. I included a local state storage so that upon refresh or revisiting the page, the user's channels would still be available.

```js const ChannelList = (props) => {
  const [tempName, setTempName] = useState("");
  
  //seed channels for direct messages for demo
  const [dms, newDm] = useStickyState(
    ["Jenny", "Malik", "Austin", "Aaliyah"],
    []
  );
  //custom hook implementation that makes use of local storage to have states persist
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
  //seed channels for demo
  const allChannels = ["General", "Tech-talk", "Party-time", "Accomplishments"];
  const teamChannels = allChannels.map((e) => {
    return (
      <MenuHover onClick={() => props.handleChannelChange(e)}>{e}</MenuHover>
    );
  });

  //maps out open dm channels for a user
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
// toggles popup to create new channel
  const createChannel = () => {
    props.togglePopup(!props.popup);
  };
  // handles submission of new channel from popup toggle
  const handleSub = (event) => {
    event.preventDefault();
    let copy = [...dms];
    copy.push(tempName);
    newDm(copy);
  };
  // new channel helper function
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
