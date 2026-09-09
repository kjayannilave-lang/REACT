import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {

  // Personal Information
  const name = "Nilave";
  const age = 24;
  const isStudent = true;

  // Favorite Hobbies
  const favoriteHobbies = ["Reading", "Music", "Coding"];

  // Heading background color
  const headingColor = "lightblue";

  // Create hobby list using for loop
  let hobbyListForLoop = [];

  for (let i = 0; i < favoriteHobbies.length; i++) {
    hobbyListForLoop.push(
      <li key={i}>{favoriteHobbies[i]}</li>
    );
  }

  // Function for button
  function showEnthusiasm() {

    document.getElementById("message").innerText =
      "Hello from React! I love my hobbies!";

    document.getElementById("heading").style.backgroundColor =
      headingColor;
  }

  return (
    <div className="container mt-5">

      {/* Heading */}
      <h1 id="heading" className="text-center p-3">
        Personal Information and Hobbies
      </h1>

      {/* Personal Information Card */}
      <div className="card shadow mt-4">
        <div className="card-body">

          <h2 className="card-title">
            Personal Information
          </h2>

          <p className="card-text">
            <strong>Name:</strong> {name}
          </p>

          <p className="card-text">
            <strong>Age:</strong> {age}
          </p>

          <p className="card-text">
            <strong>Student:</strong> {isStudent}
          </p>

        </div>
      </div>

      {/* Hobby List using For Loop */}
      <div className="mt-4">

        <h2>Favorite Hobbies - For Loop</h2>

        <ul>
          {hobbyListForLoop}
        </ul>

      </div>

      {/* Hobby List using map() */}
      <div className="mt-4">

        <h2>Favorite Hobbies - map()</h2>

        <ul>
          {favoriteHobbies.map((hobby, index) => (
            <li key={index}>{hobby}</li>
          ))}
        </ul>

      </div>

      {/* Button */}
      <button
        className="btn btn-primary mt-3"
        onClick={showEnthusiasm}
      >
        Show Enthusiasm
      </button>

      {/* Message */}
      <p id="message" className="mt-3">
        Click the button to see my enthusiasm!
      </p>

    </div>
  );
}

export default App;