
import { useEffect, useState } from "react";
import {
  getReservations,
  updateReservationAPI,
  deleteReservationAPI
} from "../services/reservationAPI";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadReservations() {
    try {
      setLoading(true);
      setError("");

      const data = await getReservations();
      setReservations(Array.isArray(data) ? data : []);
      console.log("Reservations:", data);
    } catch (err) {
      console.error("GET error:", err);
      setError("Could not load reservations. Check your API server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReservations();
  }, []);

  async function handleEdit(item) {
    const date = window.prompt("Enter new date:", item.date);
    if (date === null || !date.trim()) return;

    const time = window.prompt("Enter new time:", item.time);
    if (time === null || !time.trim()) return;

    const guestsInput = window.prompt(
      "Enter number of guests:",
      String(item.guests)
    );
    if (guestsInput === null) return;

    const guests = Number(guestsInput);

    if (!Number.isInteger(guests) || guests < 1) {
      setError("Guest count must be a positive whole number.");
      return;
    }

    try {
      setError("");

      const updated = await updateReservationAPI(item.id, {
        ...item,
        date: date.trim(),
        time: time.trim(),
        guests
      });

      setReservations((previous) =>
        previous.map((reservation) =>
          reservation.id === item.id ? updated : reservation
        )
      );

      console.log("Updated reservation:", updated);
    } catch (err) {
      console.error("PUT error:", err);
      setError("Could not update reservation.");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this reservation?")) return;

    try {
      await deleteReservationAPI(id);

      setReservations((previous) =>
        previous.filter((item) => item.id !== id)
      );

      console.log("Deleted reservation:", id);
    } catch (err) {
      console.error("DELETE error:", err);
      setError("Could not delete reservation.");
    }
  }

  return (
    <div className="container">
      <div className="panel">
        <h2>My Reservations</h2>

        <button className="btn" onClick={loadReservations}>
          Refresh
        </button>

        {error && <p className="error">{error}</p>}

        {loading ? (
          <p>Loading reservations...</p>
        ) : reservations.length === 0 ? (
          <p>No reservations found.</p>
        ) : (
          reservations.map((item) => (
            <div className="panel" key={item.id}>
              <h3>{item.restaurant || "Restaurant"}</h3>
              <p>Date: {item.date}</p>
              <p>Time: {item.time}</p>
              <p>Table: {item.table}</p>
              <p>Guests: {item.guests}</p>

              <button
                className="btn"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>{" "}

              <button
                className="btn"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Reservations;
