import React from "react";
import Comment from "../../components/Comment/index";
import Form from "../../components/Form/index";
import useComments from "../../hooks/useComments";
import "./style.css";

export const Comments = () => {
  const { comments, createComment } = useComments();

  const handleSubmit = (userId, content) => createComment(userId, content);

  return (
    <>
      <Form contentType={"Comment"} handleSubmit={handleSubmit}></Form>
      <section className="comments">
        {[...comments]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((comment) => (
            <Comment key={comment.id} comment={comment}></Comment>
          ))}
      </section>
    </>
  );
};

export default Comments;
