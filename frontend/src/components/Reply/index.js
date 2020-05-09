import React from "react";
import "./style.css";

const Reply = (props) => {
  const reply = props.reply;

  return (
    reply && (
      <div className="comment reply">
        <header className="comment__header">
          <h2 className="comment__heading">{reply.user.name} says...</h2>
          <span className="comment_timestamp">
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(reply.created_at))}
          </span>
        </header>
        <p className="comment__body">{reply.content}</p>
      </div>
    )
  );
};

export default Reply;
