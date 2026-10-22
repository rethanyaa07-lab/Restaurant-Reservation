
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="container">
      <h2>Welcome to Restaurant Reservation</h2>
      <p>Search restaurants and reserve a suitable table.</p>
      <button
        className="btn"
        onClick={() => {
          console.log("Navigating to restaurants page");
          navigate("/restaurants");
        }}
      >
        Browse Restaurants
      </button>
    </main>
  );
}

export default Home;
