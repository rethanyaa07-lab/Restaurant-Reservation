
import { createContext, useState, useEffect } from "react";

export const ReservationContext = createContext(null);

export function ReservationProvider({ children }) {
  const [reservation, setReservation] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("restaurantReservation")
      ) || {
        restaurant: null,
        date: "",
        time: "",
        table: "",
        guests: 2
      };
    } catch {
      return {
        restaurant: null,
        date: "",
        time: "",
        table: "",
        guests: 2
      };
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "restaurantReservation",
      JSON.stringify(reservation)
    );
  }, [reservation]);

  function updateReservation(details) {
    setReservation((previous) => ({
      ...previous,
      ...details
    }));
  }

  function clearReservation() {
    setReservation({
      restaurant: null,
      date: "",
      time: "",
      table: "",
      guests: 2
    });
  }

  return (
    <ReservationContext.Provider
      value={{ reservation, updateReservation, clearReservation }}
    >
      {children}
    </ReservationContext.Provider>
  );
}
