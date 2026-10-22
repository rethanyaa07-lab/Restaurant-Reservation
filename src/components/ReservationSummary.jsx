
import { useNavigate } from "react-router-dom";
import useReservation from "../hooks/useReservation";

function ReservationSummary() {
  const { reservation } = useReservation();
  const navigate = useNavigate();

  if (!reservation.restaurant) {
    return (
      <main className="container">
        <p>No reservation details. Select a restaurant first.</p>
        <button className="btn" onClick={() => navigate("/restaurants")}>
          Select Restaurant
        </button>
      </main>
    );
  }

  function confirm() {
    console.log("Reservation confirmed:", reservation);
    navigate("/confirmation");
  }

  return (
    <main className="container">
      <h2>Reservation Summary</h2>
      <p>Restaurant: {reservation.restaurant.name}</p>
      <p>Date: {reservation.date}</p>
      <p>Time: {reservation.time}</p>
      <p>Table: {reservation.table}</p>
      <p>Guests: {reservation.guests}</p>

      <button className="btn" onClick={confirm}>
        Confirm Reservation
      </button>

      <button className="btn" onClick={() => navigate("/tables")}>
        Edit Booking
      </button>
    </main>
  );
}

export default ReservationSummary;
