
import { useNavigate } from "react-router-dom";
import useReservation from "../hooks/useReservation";

function RestaurantDetail() {
  const { reservation } = useReservation();
  const restaurant = reservation.restaurant;
  const navigate = useNavigate();

  if (!restaurant) {
    return (
      <main className="container">
        <p>Select a restaurant first.</p>
        <button className="btn" onClick={() => navigate("/restaurants")}>
          Browse Restaurants
        </button>
      </main>
    );
  }

  return (
    <main className="container">
      <h2>Restaurant Details</h2>
      <img
        className="detail-image"
        src={`https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`}
        alt={restaurant.name}
      />
      <h3>{restaurant.name}</h3>
      <p>City: {restaurant.city}</p>
      <p>Address: {restaurant.address}</p>
      <p>Rating: {restaurant.rating}</p>
      <p>{restaurant.description}</p>

      <button
        className="btn"
        onClick={() => {
          console.log("Continue to booking:", restaurant);
          navigate("/tables");
        }}
      >
        Continue to Booking
      </button>
    </main>
  );
}

export default RestaurantDetail;
