import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socketContext } from "../context/userContext";
import ReactPlayer from "react-player";

const Room = () => {
  const { roomId } = useParams();

  const socket = socketContext();

  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();

  const handleUserJoined = useCallback(
    ({ email, id }) => {
      console.log(`Email ${email} joined room`);
      setRemoteSocketId(id);
    },
    [socket]
  );

  const handleUserCall = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
  });

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);

    return () => {
      socket.off("user:joined", handleUserJoined);
    };
  }, [socket, handleUserJoined]);

  return (
    <div>
      Room id is {roomId}
      <h1>{remoteSocketId ? "Connected!" : "No one in the room!"}</h1>
      {remoteSocketId && <button onClick={() => handleUserCall()}>Call</button>}
      {myStream && (
        <ReactPlayer
          playing
          muted
          url={myStream}
          height="200px"
          width="350px"
        />
      )}
    </div>
  );
};

export default Room;
