import React from "react";
import Form from "../../components/Form/index";
import Reply from "../../components/Reply/index";
import useReplies from "../../hooks/userReplies";
import "./style.css";

export const Replies = (props) => {
  const { commentId } = props;
  const { replies, createReply } = useReplies(commentId);

  const handleSubmit = (userId, content) =>
    createReply(userId, commentId, content);

  return (
    <div className="card">
      <Form contentType={"Reply"} handleSubmit={handleSubmit}></Form>
      <section className="replies">
        {[...replies]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((reply) => (
            <Reply key={reply.id} reply={reply}></Reply>
          ))}
      </section>
    </div>
  );
};

export default Replies;
