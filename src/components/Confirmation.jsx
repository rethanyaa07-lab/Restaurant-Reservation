
import { Link } from "react-router-dom";
import useReservation from "../hooks/useReservation";

function Confirmation() {
  const { reservation, clearReservation } = useReservation();

  if (!reservation.restaurant) {
    return (
      <main className="container">
        <p>No reservation found.</p>
        <Link to="/restaurants">Browse Restaurants</Link>
      </main>
    );
  }

  function finishBooking() {
    console.log("Completed reservation:", reservation);
    clearReservation();
  }

  return (
    <main className="container confirmation">
      <h2>Reservation Confirmed!</h2>
      <p>Restaurant: {reservation.restaurant.name}</p>
      <p>Date: {reservation.date}</p>
      <p>Time: {reservation.time}</p>
      <p>Table: {reservation.table}</p>
      <p>Guests: {reservation.guests}</p>

      <button className="btn" onClick={finishBooking}>
        Finish
      </button>

      <Link to="/restaurants">Book Another Table</Link>
    </main>
  );
}

export default Confirmation;
