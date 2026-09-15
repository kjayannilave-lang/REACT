import React from "react";

function Contact() {
  const headingColor = "lightblue";

  function showEnthusiasm() {
    document.getElementById("contactMessage").innerHTML =
      "Hello from React! I love this page!";

    document.getElementById("contactHeading").style.backgroundColor =
      headingColor;
  }

  return (
    <div className="container">
      <div className="card p-4 mb-4">
        <h1 id="contactHeading">
          This is the Contact Page
        </h1>

        <p id="contactMessage">
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

export default Contact;
