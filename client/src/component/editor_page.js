import React, { useEffect, useRef, useState } from "react";
import {
  useNavigate,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";

import Client from "./Client";
import Editor from "./Editor";

import { initSocket } from "../Socket";
import { ACTIONS } from "../Actions";

function EditorPage() {
  const [clients, setClients] = useState([]);

  const socketRef = useRef(null);
  const codeRef = useRef("");

  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            alert(`${username} joined the room`);
          }

          setClients(clients);

          // Send current code to the newly joined client
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            socketId,
            code: codeRef.current,
          });
        }
      );

      socketRef.current.on(
        ACTIONS.DISCONNECTED,
        ({ socketId, username }) => {
          alert(`${username} left the room`);

          setClients((prev) =>
            prev.filter((client) => client.socketId !== socketId)
          );
        }
      );
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [roomId, location.state, navigate]);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      alert("Room ID copied");
    } catch (err) {
      alert("Failed to copy Room ID");
    }
  };

  const leaveRoom = () => {
    navigate("/");
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
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
              onClick={leaveRoom}
            >
              Leave Room
            </button>
          </div>
        </div>

        <div className="col-md-10 p-0">
          <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
        </div>
      </div>
    </div>
  );
}

export default EditorPage;