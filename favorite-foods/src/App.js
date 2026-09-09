import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  // Favorite foods
  const favoriteFoods = ["Pizza", "Biriyani", "Burger", "Ice Cream"];

  // Function to show food message
  function showLove(food) {
    document.getElementById("message").innerText =
      "I love " + food + "!";
  }

  return (
    <div className="container mt-5">

      <h1 className="text-center mb-4">
        My Favorite Foods
      </h1>

      <ul className="list-group">

        {favoriteFoods.map((food, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {food}

            <button
              className="btn btn-primary"
              onClick={() => showLove(food)}
            >
              Love
            </button>

          </li>
        ))}

      </ul>

      {/* Message */}
      <p id="message" className="mt-4 text-center">
        Select a food that you love!
      </p>

    </div>
  );
}

export default App;