import React from "react";

function About() {
  const headingColor = "lightblue";

  function showEnthusiasm() {
    document.getElementById("aboutMessage").innerHTML =
      "Hello from React! I love this page!";

    document.getElementById("aboutHeading").style.backgroundColor =
      headingColor;
  }

  return (
    <div className="container">
      <div className="card p-4 mb-4">
        <h1 id="aboutHeading">
          This is the About Page
        </h1>

        <p id="aboutMessage">
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

export default About;
