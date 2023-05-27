import { useState } from "react";

import "./App.css";
import Login from "./Login";
import Home from "./Home";

function App() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(
    localStorage.getItem("user_id") !== null
  );

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(#11b0a7, #ffff66)",
        padding: "32px",
      }}
    >
      {userIsLoggedIn ? (
        <Home
          onLogOut={() => {
            setUserIsLoggedIn(false);
          }}
        />
      ) : (
        <Login
          onLogin={() => {
            setUserIsLoggedIn(true);
          }}
        />
      )}
    </div>
  );
}

export default App;
