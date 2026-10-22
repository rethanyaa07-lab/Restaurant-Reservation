
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReservation } from "../hooks/useReservation";

function TableSelection() {
  const navigate = useNavigate();
  const { reservation, updateReservation } = useReservation();

  const [tables, setTables] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [date, setDate] = useState(reservation.date || "");
  const [guests, setGuests] = useState(reservation.guests || 2);
  const [table, setTable] = useState(reservation.table || "");
  const [time, setTime] = useState(reservation.time || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [tableResponse, timeResponse] = await Promise.all([
          fetch("/tables.json"),
          fetch("/timeSlots.json")
        ]);

        if (!tableResponse.ok || !timeResponse.ok) {
          throw new Error(
            "Could not load JSON files. Check the public folder."
          );
        }

        const tableData = await tableResponse.json();
        const timeData = await timeResponse.json();

        if (!Array.isArray(tableData) || !Array.isArray(timeData)) {
          throw new Error("JSON files must contain arrays.");
        }

        console.log("Tables loaded:", tableData);
        console.log("Time slots loaded:", timeData);

        setTables(tableData);
        setTimeSlots(timeData);
      } catch (err) {
        console.error("Table selection error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const availableTables = tables.filter(
    (item) => Number(item.capacity) >= Number(guests)
  );

  function handleGuestsChange(value) {
    const count = Math.max(1, Number(value) || 1);
    setGuests(count);

    const selected = tables.find(
      (item) => String(item.id) === String(table)
    );

    if (selected && Number(selected.capacity) < count) {
      setTable("");
    }
  }

  function handleContinue() {
    if (!date || !time || !table || Number(guests) < 1) {
      setError("Please select a date, time, guests and table.");
      return;
    }

    const selectedTable = tables.find(
      (item) => String(item.id) === String(table)
    );

    if (!selectedTable || selectedTable.capacity < guests) {
      setError("Please select a table suitable for your guests.");
      return;
    }

    updateReservation({
      restaurant: reservation.restaurant,
      date,
      time,
      table: selectedTable.name,
      guests: Number(guests)
    });

    console.log("Selected reservation:", {
      restaurant: reservation.restaurant,
      date,
      time,
      table: selectedTable.name,
      guests: Number(guests)
    });

    navigate("/summary");
  }

  return (
    <div className="container">
      <div className="panel">
        <h1>Table Selection</h1>

        <p>
          Restaurant:{" "}
          {reservation.restaurant?.name || "Istana Emas"}
        </p>

        {error && <p className="error">{error}</p>}

        <label>Date:</label>
        <input
          type="date"
          value={date}
          min={new Date().toLocaleDateString("en-CA")}
          onChange={(e) => setDate(e.target.value)}
        />

        <br /><br />

        <label>Guests:</label>
        <input
          type="number"
          min="1"
          value={guests}
          onChange={(e) => handleGuestsChange(e.target.value)}
        />

        <h3>Available Tables</h3>

        {loading ? (
          <p>Loading tables...</p>
        ) : availableTables.length === 0 ? (
          <p>No tables available for {guests} guests.</p>
        ) : (
          <div className="table-options">
            {availableTables.map((item) => (
              <button
                key={item.id}
                type="button"
                className={
                  String(table) === String(item.id)
                    ? "btn selected"
                    : "btn"
                }
                onClick={() => {
                  setTable(String(item.id));
                  setError("");
                }}
              >
                {item.name} ({item.capacity} seats)
              </button>
            ))}
          </div>
        )}

        <p>
          Selected table:{" "}
          {tables.find(
            (item) => String(item.id) === String(table)
          )?.name || "None"}
        </p>

        <h3>Time Slots</h3>

        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          <option value="">Select time</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        <br /><br />

        <button className="btn" onClick={handleContinue}>
          Continue to Summary
        </button>
      </div>
    </div>
  );
}

export default TableSelection;
