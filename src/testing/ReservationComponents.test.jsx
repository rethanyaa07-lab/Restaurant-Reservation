import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, jest } from "@jest/globals";

import {
  RestaurantCard,
  RestaurantDetail,
  RestaurantSearch,
  TableSelection,
  TimeSlotSelection,
  ReservationManager,
  LoadingMessage,
  ErrorMessage
} from "./ReservationTestComponents";

const restaurants = [
  {
    id: 1,
    name: "Spice Garden",
    cuisine: "Indian",
    location: "Chennai",
    rating: 4.5
  },
  {
    id: 2,
    name: "Pizza Corner",
    cuisine: "Italian",
    location: "Bangalore",
    rating: 4.2
  }
];

describe("Restaurant Reservation Components", () => {
  test("a) renders a restaurant card", () => {
    const handleSelect = jest.fn();

    render(
      <RestaurantCard
        restaurant={restaurants[0]}
        onSelect={handleSelect}
      />
    );

    expect(screen.getByText("Spice Garden")).toBeInTheDocument();
    expect(screen.getByText("Indian")).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: "View Details" })
    );

    expect(handleSelect).toHaveBeenCalledWith(restaurants[0]);
  });

  test("a) displays restaurant details", () => {
    render(
      <RestaurantDetail restaurant={restaurants[0]} />
    );

    expect(screen.getByText("Spice Garden")).toBeInTheDocument();
    expect(screen.getByText("Cuisine: Indian")).toBeInTheDocument();
    expect(screen.getByText("Location: Chennai")).toBeInTheDocument();
    expect(screen.getByText("Rating: 4.5")).toBeInTheDocument();
  });

  test("b) searches restaurants by name", () => {
    render(
      <RestaurantSearch
        restaurants={restaurants}
        onSelect={jest.fn()}
      />
    );

    fireEvent.change(
      screen.getByLabelText("Search restaurants"),
      { target: { value: "Pizza" } }
    );

    expect(screen.getByText("Pizza Corner")).toBeInTheDocument();
    expect(screen.queryByText("Spice Garden")).not.toBeInTheDocument();
  });

  test("b) filters restaurants by cuisine", () => {
    render(
      <RestaurantSearch
        restaurants={restaurants}
        onSelect={jest.fn()}
      />
    );

    fireEvent.change(
      screen.getByLabelText("Filter by cuisine"),
      { target: { value: "Indian" } }
    );

    expect(screen.getByText("Spice Garden")).toBeInTheDocument();
    expect(screen.queryByText("Pizza Corner")).not.toBeInTheDocument();
  });

  test("b) displays a message when no restaurant matches", () => {
    render(
      <RestaurantSearch
        restaurants={restaurants}
        onSelect={jest.fn()}
      />
    );

    fireEvent.change(
      screen.getByLabelText("Search restaurants"),
      { target: { value: "Unknown Restaurant" } }
    );

    expect(screen.getByText("No restaurants found")).toBeInTheDocument();
  });

  test("c) selects an available table", () => {
    const handleSelect = jest.fn();

    render(
      <TableSelection
        tables={[
          { id: 1, name: "Table 1", available: true },
          { id: 2, name: "Table 2", available: false }
        ]}
        onSelect={handleSelect}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Table 1" }));

    expect(handleSelect).toHaveBeenCalledWith({
      id: 1,
      name: "Table 1",
      available: true
    });

    expect(
      screen.getByRole("button", { name: "Table 2" })
    ).toBeDisabled();
  });

  test("c) selects a time slot", () => {
    const handleSelect = jest.fn();

    render(
      <TimeSlotSelection
        timeSlots={["6:00 PM", "7:00 PM", "8:00 PM"]}
        onSelect={handleSelect}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "7:00 PM" }));

    expect(handleSelect).toHaveBeenCalledWith("7:00 PM");
  });

  test("c) displays a message when no tables are available", () => {
    render(
      <TableSelection tables={[]} onSelect={jest.fn()} />
    );

    expect(screen.getByText("No tables available")).toBeInTheDocument();
  });

  test("c) displays a message when no time slots are available", () => {
    render(
      <TimeSlotSelection timeSlots={[]} onSelect={jest.fn()} />
    );

    expect(screen.getByText("No time slots available")).toBeInTheDocument();
  });

  test("d) creates a reservation", () => {
    const handleCreate = jest.fn();

    render(
      <ReservationManager
        onCreate={handleCreate}
        onCancel={jest.fn()}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Create Reservation" })
    );

    expect(handleCreate).toHaveBeenCalledWith({
      id: "RES-101",
      restaurant: "Spice Garden",
      table: "Table 1",
      time: "7:00 PM"
    });

    expect(
      screen.getByText("Reservation confirmed: RES-101")
    ).toBeInTheDocument();
  });

  test("d) cancels a reservation", () => {
    const handleCancel = jest.fn();

    render(
      <ReservationManager
        onCreate={jest.fn()}
        onCancel={handleCancel}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Create Reservation" })
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Cancel Reservation" })
    );

    expect(handleCancel).toHaveBeenCalledWith({
      id: "RES-101",
      restaurant: "Spice Garden",
      table: "Table 1",
      time: "7:00 PM"
    });

    expect(
      screen.queryByText("Reservation confirmed: RES-101")
    ).not.toBeInTheDocument();
  });

  test("e) displays a loading message", () => {
    render(<LoadingMessage />);

    expect(screen.getByRole("status")).toHaveTextContent(
      "Loading restaurants..."
    );
  });

  test("e) displays an error message", () => {
    render(<ErrorMessage message="Failed to load restaurants" />);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Failed to load restaurants"
    );
  });
});
