
function SearchBar({ search, setSearch, inputRef }) {
  return (
    <input
      ref={inputRef}
      className="search"
      type="text"
      placeholder="Search by restaurant or city"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchBar;
