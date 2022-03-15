import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, own, sender, receiver }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const senderProfilePicture = sender? sender.profilePicture : PF+"person/noAvatar.png";
  const receiverProfilePicture = receiver? receiver.profilePicture : PF+"person/noAvatar.png";


  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={ own? senderProfilePicture : receiverProfilePicture }
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}