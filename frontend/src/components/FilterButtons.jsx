function FilterButtons({ currentFilter, onFilterChange }) {
  const filters = ['all', 'pending', 'completed'];

  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 capitalize ${
            currentFilter === filter
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
