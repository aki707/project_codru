import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "../styles/Commentfile.css";

const Comment = ({ comment, addReply, toggleVisibility, visibleComments }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = (e) => {
    e.preventDefault();
    addReply(comment.id, replyText);
    setReplyText("");
    setShowReplyForm(false);
  };

  const isVisible = visibleComments.includes(comment.id);

  return (
    <div
      className={`Commentcomponent ${comment.parentId ? "NestedComment" : ""}`}
    >
      <div className="Userphoto">
        <img src={comment.photo} alt="" />
      </div>
      <div className="UserComments">
        <div className="Usercomment">
          <h3>{comment.name}</h3>
          <span>{comment.text}</span>
        </div>
        <div className="Userreplylike">
          <span>
            <FontAwesomeIcon icon={faThumbsUp} />
          </span>
          <span>
            <FontAwesomeIcon icon={faThumbsDown} />
          </span>
          <span onClick={() => setShowReplyForm(!showReplyForm)}>Reply</span>
          {comment.replies.length > 0 && (
            <span onClick={() => toggleVisibility(comment.id)}>
              {isVisible ? "Hide Replies" : "Show Replies"}
            </span>
          )}
        </div>
        {showReplyForm && (
          <div className="commentreplyfield">
            <textarea
              placeholder="Write your reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            ></textarea>
            <div>
              <span onClick={() => setShowReplyForm(false)}>Cancel</span>
              <button onClick={handleReply}>Submit</button>
            </div>
          </div>
        )}
        {isVisible &&
          comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              addReply={addReply}
              toggleVisibility={toggleVisibility}
              visibleComments={visibleComments}
            />
          ))}
      </div>
    </div>
  );
};

const Commentfile = ({ comments, addReply }) => {
  const [visibleComments, setVisibleComments] = useState([]);

  const toggleVisibility = (id) => {
    setVisibleComments((prevVisible) =>
      prevVisible.includes(id)
        ? prevVisible.filter((commentId) => commentId !== id)
        : [...prevVisible, id]
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
      }}
    >
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          addReply={addReply}
          toggleVisibility={toggleVisibility}
          visibleComments={visibleComments}
        />
      ))}
    </div>
  );
};

export default Commentfile;
