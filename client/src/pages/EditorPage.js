import React, { useEffect, useRef, useState } from "react";
import {
  useNavigate,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";

import Client from "../components/Client";
import Editor from "../components/Editor";
import Toolbar from "../components/Toolbar";

import { toast } from "react-toastify";
import { initSocket } from "../socket/Socket";
import { ACTIONS } from "../constants/Actions";
import InputPanel from "../components/InputPanel";
import OutputPanel from "../components/OutputPanel";
import "../styles/editor.css";

function EditorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();

  const socketRef = useRef(null);

  const [clients, setClients] = useState([]);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      // Listen for code updates FIRST
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        setCode(code || "");
      });

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username }) => {
          setClients(clients);

          if (username !== location.state?.username) {
            toast.success(`${username} joined the room 🚀`);
          }
        }
      );
      socketRef.current.on(
        ACTIONS.LANGUAGE_CHANGE,
        ({ language }) => {
          setLanguage(language);
        }
      );


      socketRef.current.on(
        ACTIONS.DISCONNECTED,
        ({ socketId, username }) => {
          toast.info(`${username} left the room`);

          setClients((prev) =>
            prev.filter((client) => client.socketId !== socketId)
          );
        }
      );

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.off(ACTIONS.CODE_CHANGE);
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
        socketRef.current.disconnect();
      }
    };
  }, [roomId]);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID copied!");
    } catch {
      toast.error("Couldn't copy Room ID");
    }
  };

  return (
   <div className="container-fluid ide-container">
      <div className="row ide-main">

        <div className="col-md-2 bg-dark text-light d-flex flex-column p-3">

          <h4>CodeCast</h4>

          <hr />

          <h5>Members</h5>

          <div className="mb-3">
            {clients.map((client) => (
              <Client
                key={client.socketId}
                username={client.username}
              />
            ))}
          </div>

          <div className="mt-auto">

            <button
              className="btn btn-success w-100 mb-2"
              onClick={copyRoomId}
            >
              Copy Room ID
            </button>

            <button
              className="btn btn-danger w-100"
              onClick={() => navigate("/")}
            >
              Leave Room
            </button>

          </div>

        </div>

        <div className="col-md-10 editor-column">

          <Toolbar
            language={language}
            setLanguage={(newLanguage) => {
              setLanguage(newLanguage);

              socketRef.current.emit(ACTIONS.LANGUAGE_CHANGE, {
                roomId,
                language: newLanguage,
              });
            }}
            onRun={() => {}}
            onCopy={() => navigator.clipboard.writeText(code)}
            onDownload={() => {}}
          />

          <div className="editor-wrapper">
            <Editor
              socketRef={socketRef}
              roomId={roomId}
              code={code}
              setCode={setCode}
              language={language}
            />
          </div>

          <div className="bottom-panels">

            <div className="panel">
              <div className="panel-header">
                Input
              </div>

              <div className="panel-body">
                <InputPanel
                  input={input}
                  setInput={setInput}
                />
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                Output
              </div>

              <div className="panel-body">
                <OutputPanel
                  output={output}
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default EditorPage;