import React, { useCallback, useEffect, useRef } from "react";
import { socketContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const socket = socketContext();

  const emailRef = useRef("");
  const roomRef = useRef("");

  const navigate = useNavigate();

  const handleUserSubmit = useCallback(
    (ev) => {
      ev.preventDefault();
      socket.emit("room:join", {
        email: emailRef.current.value,
        room: roomRef.current.value,
      });
    },
    [socket]
  );

  const handleJoinUser = useCallback((data)=>{
    const { email , room } = data;
    navigate(`/room/${room}`);
  },[])

  useEffect(()=>{
    socket.on("room:join", handleJoinUser);
    return () =>{
      socket.off("room:join", handleJoinUser);
    }
  },[socket , handleJoinUser]);

  return (
    <form
      onSubmit={handleUserSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <label htmlFor="email-input" style={{ color: "#000" }}>
        Enter your mail
      </label>
      <input type="email" id="email-input" ref={emailRef} />
      <br />
      <label htmlFor="room-code-box" style={{ color: "#000" }}>
        Enter room id
      </label>
      <input type="text" id="room-code-box" ref={roomRef} />
      <br />
      <button type="submit" style={{ padding: "5px 20px", cursor: "pointer" }}>
        Join
      </button>
    </form>
  );
};

export default Home;
