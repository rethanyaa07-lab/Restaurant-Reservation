
import { useMemo, useState } from "react";

export function RestaurantCard({ restaurant, onSelect }) {
  return (
    <article>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.cuisine}</p>
      <p>{restaurant.location}</p>
      <button onClick={() => onSelect(restaurant)}>
        View Details
      </button>
    </article>
  );
}

export function RestaurantDetail({ restaurant }) {
  return (
    <section aria-label="Restaurant details">
      <h2>{restaurant.name}</h2>
      <p>Cuisine: {restaurant.cuisine}</p>
      <p>Location: {restaurant.location}</p>
      <p>Rating: {restaurant.rating}</p>
    </section>
  );
}

export function RestaurantSearch({ restaurants, onSelect }) {
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("All");

  const cuisines = [
    "All",
    ...new Set(restaurants.map((item) => item.cuisine))
  ];

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(search.toLowerCase());

      const matchesCuisine =
        cuisine === "All" || restaurant.cuisine === cuisine;

      return matchesSearch && matchesCuisine;
    });
  }, [restaurants, search, cuisine]);

  return (
    <section>
      <label htmlFor="restaurant-search">Search restaurants</label>
      <input
        id="restaurant-search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Enter restaurant name or location"
      />

      <label htmlFor="cuisine-filter">Filter by cuisine</label>
      <select
        id="cuisine-filter"
        value={cuisine}
        onChange={(event) => setCuisine(event.target.value)}
      >
        {cuisines.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {filteredRestaurants.length === 0 ? (
        <p>No restaurants found</p>
      ) : (
        filteredRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onSelect={onSelect}
          />
        ))
      )}
    </section>
  );
}

export function TableSelection({ tables, onSelect }) {
  return (
    <section aria-label="Table selection">
      <h2>Select a table</h2>
      {tables.length === 0 ? (
        <p>No tables available</p>
      ) : (
        tables.map((table) => (
          <button
            key={table.id}
            onClick={() => onSelect(table)}
            disabled={!table.available}
          >
            {table.name}
          </button>
        ))
      )}
    </section>
  );
}

export function TimeSlotSelection({ timeSlots, onSelect }) {
  return (
    <section aria-label="Time slot selection">
      <h2>Select a time slot</h2>
      {timeSlots.length === 0 ? (
        <p>No time slots available</p>
      ) : (
        timeSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => onSelect(slot)}
          >
            {slot}
          </button>
        ))
      )}
    </section>
  );
}

export function ReservationManager({ onCreate, onCancel }) {
  const [reservation, setReservation] = useState(null);

  function createReservation() {
    const newReservation = {
      id: "RES-101",
      restaurant: "Spice Garden",
      table: "Table 1",
      time: "7:00 PM"
    };

    setReservation(newReservation);
    onCreate(newReservation);
  }

  function cancelReservation() {
    onCancel(reservation);
    setReservation(null);
  }

  return (
    <section aria-label="Reservation manager">
      <button onClick={createReservation}>
        Create Reservation
      </button>

      {reservation && (
        <div>
          <p>Reservation confirmed: {reservation.id}</p>
          <p>{reservation.restaurant}</p>
          <p>{reservation.table}</p>
          <p>{reservation.time}</p>
          <button onClick={cancelReservation}>
            Cancel Reservation
          </button>
        </div>
      )}
    </section>
  );
}

export function LoadingMessage() {
  return <p role="status">Loading restaurants...</p>;
}

export function ErrorMessage({ message }) {
  return <p role="alert">{message}</p>;
}
