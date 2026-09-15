
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams
} from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const students = ["Alexa", "Riya", "Rahul", "Anu"];

  function goToRiya() {
    navigate("/student/Riya");
  }

  return (
    <div className="container">
      <h1>Student List</h1>

      <p>
        <Link to="/student/Alexa">Alexa</Link>
      </p>

      <p>
        <Link to="/student/Riya">Riya</Link>
      </p>

      <p>
        <Link to="/student/Rahul">Rahul</Link>
      </p>

      <p>
        <Link to="/student/Anu">Anu</Link>
      </p>

      <button onClick={goToRiya}>
        Go to Riya
      </button>
    </div>
  );
}

function Student() {
  const { name } = useParams();

  return (
    <div className="container">
      <h1>Welcome, {name}!</h1>

      <Link to="/">
        Back to Home
      </Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student/:name" element={<Student />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;





