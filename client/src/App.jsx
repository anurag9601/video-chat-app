import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Room from "./screens/Room";

const App = () => {
  return <>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/room/:roomId" element={<Room />} />
  </Routes>
  </>;
};

export default App;
