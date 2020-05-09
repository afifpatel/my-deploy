import React from "react";
import Comments from "../../containers/Comments/index";
import "./style.css";

function App() {
  return (
    <div className="comments-container">
      <header className="comments-header">
        <h1>Comments</h1>
      </header>
      <Comments />
    </div>
  );
}

export default App;
