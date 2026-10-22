
import { useEffect, useState } from "react";

function useRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://restaurant-api.dicoding.dev/list"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch restaurants.");
        }

        const data = await response.json();

        console.log("useRestaurants API response:", data);
        setRestaurants(data.restaurants || []);
      } catch (err) {
        console.error("Restaurant fetch error:", err);
        setError(err.message || "Unable to load restaurants.");
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurants();
  }, []);

  return { restaurants, loading, error };
}

export default useRestaurants;
