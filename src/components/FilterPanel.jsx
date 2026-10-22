
function FilterPanel({ city, setCity, cities }) {
  return (
    <select value={city} onChange={(e) => setCity(e.target.value)}>
      <option value="All">All Cities</option>
      {cities.map((item) => (
        <option key={item} value={item}>{item}</option>
      ))}
    </select>
  );
}

export default FilterPanel;
