import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();

    const id = uuid();

    setRoomId(id);

    toast.success("Room ID Generated");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Both fields are required");
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });

    toast.success("Room Joined");
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-4">
          <div className="card p-3 bg-dark">
            <h3 className="text-light text-center mb-4">
              CodeCast
            </h3>

            <input
              type="text"
              className="form-control mb-2"
              placeholder="ROOM ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              onKeyUp={handleInputEnter}
            />

            <input
              type="text"
              className="form-control mb-2"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyUp={handleInputEnter}
            />

            <button
              className="btn btn-success"
              onClick={joinRoom}
            >
              JOIN
            </button>

            <p className="text-light mt-3">
              Don't have a room ID?
              <span
                style={{
                  cursor: "pointer",
                  color: "lime",
                }}
                onClick={generateRoomId}
              >
                {" "}
                Create New Room
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;