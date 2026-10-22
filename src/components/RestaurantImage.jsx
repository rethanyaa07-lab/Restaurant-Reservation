
function RestaurantImage({ src, alt, className = "" }) {
  return (
    <img
      src={src}
      alt={alt || "Restaurant"}
      className={className}
      loading="lazy"
      decoding="async"
      onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src =
          "https://placehold.co/600x400?text=Restaurant";
      }}
    />
  );
}

export default RestaurantImage;
