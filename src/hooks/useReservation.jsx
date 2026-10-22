
import { useContext } from "react";
import { ReservationContext } from "../context/ReservationContext";

function useReservation() {
  const context = useContext(ReservationContext);

  if (!context) {
    throw new Error(
      "useReservation must be used inside ReservationProvider"
    );
  }

  return context;
}

export { useReservation };
export default useReservation;
