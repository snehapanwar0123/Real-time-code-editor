import React from "react";

function InputPanel({ input, setInput }) {
  return (
    <div    
    >
      

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Custom Input..."
        className="form-control"
        style={{
          background: "#252526",
          color: "white",
          border: "none",
          borderRadius: 0,
          height: "120px",
          resize: "vertical",
        }}
      />
    </div>
  );
}

export default InputPanel;