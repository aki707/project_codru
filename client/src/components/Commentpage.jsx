import { useState } from "react";
import Commentfile from "./Commentfile";

const initialComments = [
  {
    id: 1,
    name: "User1",
    photo: "photo_url_1",
    text: "This is a comment",
    replies: [
      {
        id: 2,
        name: "User2",
        photo: "photo_url_2",
        text: "This is a reply",
        replies: [],
      },
    ],
  },
];

function Commentpage() {
  const [comments, setComments] = useState(initialComments);

  const addReply = (commentId, replyText) => {
    const newComments = [...comments];
    const addNestedReply = (commentsList) => {
      commentsList.forEach((comment) => {
        if (comment.id === commentId) {
          comment.replies.push({
            id: new Date().getTime(),
            name: "Current User",
            photo: "current_user_photo_url",
            text: replyText,
            replies: [],
          });
        } else {
          addNestedReply(comment.replies);
        }
      });
    };
    addNestedReply(newComments);
    setComments(newComments);
  };

  return (
    <div>
      <Commentfile comments={comments} addReply={addReply} />
    </div>
  );
}

export default Commentpage;
