import React from "react";

function Client({ username }) {
  return (
    <div
      style={{
        padding: "8px",
        marginBottom: "5px",
        background: "#343a40",
        borderRadius: "5px",
        color: "white",
      }}
    >
      {username}
    </div>
  );
}

export default Client;