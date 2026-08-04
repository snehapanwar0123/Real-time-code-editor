import React from "react";
import { LANGUAGES } from "../constants/languages";

function Toolbar({
  language,
  setLanguage,
  onRun,
  onCopy,
  onDownload,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 18px",
        background: "#1e1e1e",
        borderBottom: "1px solid #333",
      }}
    >
      <div style={{ display: "flex", gap: "12px" }}>
        <select
            className="form-select"
            style={{ width: "180px" }}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
        >
            {LANGUAGES.map((lang) => (
                <option
                    key={lang.id}
                    value={lang.value}
                >
                    {lang.label}
                </option>
            ))}
        </select>

        <button
          className="btn btn-success"
          onClick={onRun}
        >
          ▶ Run
        </button>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          className="btn btn-outline-light"
          onClick={onCopy}
        >
          Copy Code
        </button>

        <button
          className="btn btn-outline-info"
          onClick={onDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default Toolbar;