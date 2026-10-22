import { Link } from "react-router-dom";
import RestaurantImage from "./RestaurantImage";

function RestaurantCard({ restaurant }) {
  if (!restaurant) {
    return null;
  }

  const {
    id,
    _id,
    name,
    image,
    imageUrl,
    cuisine,
    rating,
    location,
    price,
    description
  } = restaurant;

  const restaurantId = id || _id;

  return (
    <div className="restaurant-card">
      <RestaurantImage
        src={image || imageUrl}
        alt={name || "Restaurant"}
        className="restaurant-card-image"
      />

      <div className="restaurant-card-content">
        <h3>{name || "Restaurant Name"}</h3>

        <p className="restaurant-cuisine">
          <strong>Cuisine:</strong> {cuisine || "Not specified"}
        </p>

        <p className="restaurant-rating">
          <strong>Rating:</strong>{" "}
          {rating != null ? `${rating} / 5 ⭐` : "Not rated"}
        </p>

        <p className="restaurant-location">
          <strong>Location:</strong> {location || "Not specified"}
        </p>

        {price != null && (
          <p className="restaurant-price">
            <strong>Price:</strong> ₹{price}
          </p>
        )}

        {description && (
          <p className="restaurant-description">
            {description}
          </p>
        )}

        {restaurantId != null ? (
          <Link
            to={`/restaurant/${restaurantId}`}
            className="restaurant-card-button"
            aria-label={`View details for ${name || "restaurant"}`}
          >
            View Details
          </Link>
        ) : (
          <button type="button" disabled>
            Details Unavailable
          </button>
        )}
      </div>
    </div>
  );
}

export default RestaurantCard;
