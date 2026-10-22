
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="header">
      <h1>
        <Link to={user ? "/restaurants" : "/login"}>
          Restaurant Reservation
        </Link>
      </h1>

      <nav>
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/restaurants">Restaurants</Link>
            <Link to="/restaurant-detail">Details</Link>
            <Link to="/tables">Tables</Link>
            <Link to="/summary">Summary</Link>
            <Link to="/reservations">My Reservations</Link>
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
