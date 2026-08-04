import React, { useEffect, useState } from "react";
import { ACTIONS } from "../Actions";

function Editor({ socketRef, roomId, onCodeChange }) {
  const [code, setCode] = useState("");

  useEffect(() => {
    if (!socketRef.current) return;

    const handleCodeChange = ({ code }) => {
        if (code !== null) {
            setCode(code);

            if (onCodeChange) {
                onCodeChange(code);
            }
        }
    };

    socketRef.current.on(ACTIONS.CODE_CHANGE, handleCodeChange);

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE, handleCodeChange);
    };
  }, [socketRef, onCodeChange]);

  const handleChange = (e) => {
    const newCode = e.target.value;

    setCode(newCode);

    if (onCodeChange) {
      onCodeChange(newCode);
    }

    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
      roomId,
      code: newCode,
    });
  };

  return (
    <textarea
      value={code}
      onChange={handleChange}
      className="form-control h-100"
      style={{
        height: "100%",
        minHeight: "80vh",
        fontFamily: "monospace",
        fontSize: "16px",
        resize: "none",
      }}
    />
  );
}

export default Editor;