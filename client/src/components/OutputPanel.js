import React from "react";

function OutputPanel({ output }) {
  return (
    <div
      >

      <pre
        style={{
          margin: 0,
          padding: "15px",
          minHeight: "120px",
          color: "#00ff88",
          background: "#252526",
        }}
      >
        {output || "Waiting for execution..."}
      </pre>
    </div>
  );
}

export default OutputPanel;