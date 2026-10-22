
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRestaurants from "../hooks/useRestaurants";
import useReservation from "../hooks/useReservation";
import RestaurantCard from "./RestaurantCard";

function RestaurantList() {
  const { restaurants, loading, error } = useRestaurants();
  const { updateReservation } = useReservation();
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");
  const navigate = useNavigate();

  const cities = useMemo(
    () => [...new Set(restaurants.map((item) => item.city))].sort(),
    [restaurants]
  );

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((item) => {
      const term = search.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(term) ||
        item.city.toLowerCase().includes(term);

      return matchesSearch && (city === "All" || item.city === city);
    });
  }, [restaurants, search, city]);

  function selectRestaurant(item) {
    console.log("Selected restaurant:", item);
    updateReservation({
      restaurant: item,
      date: "",
      time: "",
      table: ""
    });
    navigate("/restaurant-detail");
  }

  if (loading) return <main className="container">Loading restaurants...</main>;

  if (error) {
    return <main className="container"><p className="error">{error}</p></main>;
  }

  return (
    <main className="container">
      <h2>Restaurants</h2>

      <input
        className="search"
        placeholder="Search restaurant or city"
        value={search}
        onChange={(e) => {
          console.log("Search:", e.target.value);
          setSearch(e.target.value);
        }}
      />

      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="All">All Cities</option>
        {cities.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>

      <p>Restaurants found: {filteredRestaurants.length}</p>

      <div className="restaurant-grid">
        {filteredRestaurants.map((item) => (
          <RestaurantCard
            key={item.id}
            restaurant={item}
            onSelect={selectRestaurant}
          />
        ))}
      </div>

      {filteredRestaurants.length === 0 && <p>No restaurants found.</p>}
    </main>
  );
}

export default RestaurantList;
