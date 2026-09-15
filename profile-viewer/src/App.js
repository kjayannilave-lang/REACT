import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    if (userName !== "Guest") {
      console.log("User changed to Alice");
    }
  }, [userName]);

  function loginAsAlice() {
    setUserName("Alice");
  }

  return (
    <div className="container">
      <h1>Welcome, {userName}!</h1>

      <button onClick={loginAsAlice}>
        Login as Alice
      </button>
    </div>
  );
}

export default App;
