
export function optimizeRestaurantImage(url) {
  if (typeof url !== "string" || !url.trim()) {
    return "";
  }

  // Only allow HTTPS remote images or local public paths.
  if (url.startsWith("/")) {
    return url;
  }

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.protocol !== "https:") {
      return "";
    }

    return parsedUrl.href;
  } catch {
    return "";
  }
}

export function validateReservation({
  guests,
  date,
  time,
  restaurantId,
  tableId
}) {
  const guestCount = Number(guests);

  if (
    !Number.isInteger(guestCount) ||
    guestCount < 1 ||
    guestCount > 20
  ) {
    return "Enter between 1 and 20 guests.";
  }

  if (!date || Number.isNaN(Date.parse(date))) {
    return "Select a valid reservation date.";
  }

  if (!time) {
    return "Select a reservation time.";
  }

  if (!restaurantId) {
    return "Select a restaurant.";
  }

  if (!tableId) {
    return "Select a table.";
  }

  return "";
}
