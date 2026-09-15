import React from "react";

function Home() {
  const headingColor = "lightblue";

  function showEnthusiasm() {
    document.getElementById("homeMessage").innerHTML =
      "Hello from React! I love this page!";

    document.getElementById("homeHeading").style.backgroundColor =
      headingColor;
  }

  return (
    <div className="container">
      <div className="card p-4 mb-4">
        <h1 id="homeHeading">
          This is the Home Page
        </h1>

        <p id="homeMessage">
          Click the button to see my enthusiasm!
        </p>

        <button
          className="btn btn-primary"
          onClick={showEnthusiasm}
        >
          Show Enthusiasm
        </button>
      </div>
    </div>
  );
}

export default Home;
