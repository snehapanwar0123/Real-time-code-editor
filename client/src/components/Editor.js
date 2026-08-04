import React from "react";
import MonacoEditor from "@monaco-editor/react";

function CodeEditor({
  socketRef,
  roomId,
  code,
  setCode,
  language,
}) {

  const handleEditorChange = (value) => {
    const newCode = value || "";

    setCode(newCode);

    if (socketRef.current) {
      socketRef.current.emit("code-change", {
        roomId,
        code: newCode,
      });
    }
  };

  return (
    <MonacoEditor
      height="calc(100vh - 60px)"
      language={language}
      theme="vs-dark"
      value={code}
      onChange={handleEditorChange}
      options={{
        fontSize: 16,
        minimap: {
          enabled: false,
        },
        automaticLayout: true,
        scrollBeyondLastLine: false,
        wordWrap: "on",
      }}
    />
  );
}

export default CodeEditor;