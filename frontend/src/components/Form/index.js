import autosize from "autosize";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useUsers from "../../hooks/useUsers";
import "./style.css";

export const Form = (props) => {
  const { contentType, handleSubmit } = props;
  const { users } = useUsers();
  const textareaRef = useRef();
  const [userId, setUserId] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    autosize(textareaRef.current);
  }, []);

  useEffect(() => {
    if (users.length) {
      setUserId(users[0].id);
    }
  }, [users]);

  const handleContentChange = (e) => setContent(e.target.value);

  const handleUserChange = (e) => setUserId(parseInt(e.target.value));

  const formSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!userId) {
        alert("No user selected");
        return;
      }
      handleSubmit(userId, content);
      setContent("");
    },
    [userId, content, handleSubmit]
  );

  return (
    <section className="compose">
      <h2 className="compose__heading">
        {contentType.toLowerCase().includes("comment") ? "You say..." : "Reply"}
      </h2>
      <form className="compose__body" onSubmit={formSubmit}>
        <textarea
          ref={textareaRef}
          rows={4}
          placeholder="Enter some text"
          required
          autoFocus
          value={content}
          onChange={handleContentChange}
          className="compose__textarea"
        />
        <div className="compose__dropdown">
          <label htmlFor="user-select">{contentType} as</label>
          <select
            id="user-select"
            onChange={handleUserChange}
            className="dropdown"
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="compose__button">
          <button className="button button--primary">Submit</button>
        </div>
      </form>
    </section>
  );
};

export default Form;
