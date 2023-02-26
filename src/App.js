import React, { useEffect, useState } from "react";
import './App.css';

import Title from './elements/Title.js'
import GameWrapper from "./elements/GameWrapper.js"

function App() {
  // handle keypresses
  useEffect(() => {
    function handleKeyDown(e) {
      console.log("keydown:", e.target);  // element that keydown was in
      console.log("keydown:", e.keyCode); // code of keydown
    }

    function handleKeyUp(e) {
      console.log("keyup:", e.target);  // element that keydown was in
      console.log("keyup:", e.keyCode); // code of keydown
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);


    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);

    };
  }, []);



  return (
    <div className="App">
      <Title/>
      <GameWrapper/>
    </div>
  );
}

export default App;
